import User from "../models/User";
import { Utils } from "../utils/utils";
import { NodeMailer } from "../utils/NodeMailer";
import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import { getEnvironmentVariables } from "../environments/env";

export class UserController {
    static async SignUp(req, res, next) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const dob = req.body.dateOfBirth;
        const address = req.body.address;
        const cart = req.body.cart;
        const histories = req.body.histories;
        const cards = req.body.cards;
        const profilePhoto = req.body.profilePhoto;
        const created_at = req.body.created_at;
        const updated_at = req.body.updated_at;
        const verificationToken = Utils.generateVerificationToken();

        try {
            const hash = await Utils.encryptPassword(password);
            const data = {
                name: name,
                email: email,
                password: hash,
                phone: phone,
                dateOfBirth: dob,
                address: address,
                cart: cart,
                histories: histories,
                cards: cards,
                profilePhoto: profilePhoto,
                created_at: created_at,
                updated_at: updated_at,
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            }
            let user = await new User(data).save();
            await NodeMailer.sendEmail({
                to: data.email,
                subject: 'BaggageApp - Your Registration Details',
                html: `<h2>Dear ${data.name}, </h2>
                        <h3>Welcome and thank you for registering with <a>BaggageApp</a> </h3>
                        <h3> You have been Successfull Singed in to Baggage App </h3>
                        <h3>Click <a href='http://localhost:4200/user'>here</a> to Login</h3>
                         <br/><br/><h3> We are happy to see you with us.</h3><h3> Team BaggageApp</h3>`
            });
            res.send(user);
        } catch (e) {
            next(e);
        }
    }

    static async Verify(req, res, next) {
        const verificationToken = req.body.verification_token;
        const email = req.user.email;
        try {
            const user = await User.findOneAndUpdate({
                email: email,
                varification_token: verificationToken,
                varification_token_time: { $gt: Date.now() }
            }, { verifyed: true }, { new: true });
            if (user) {
                res.send(user);
            } else {
                throw new Error('Verification Token Is Expired, Please Request for a new One.')
            }
        } catch (e) {
            next(e)
        }
    }

    static async ResendVerificationEmail(req, res, next) {
        const email = req.user.email;
        const verificationToken = Utils.generateVerificationToken();
        try {
            const user: any = await User.findOneAndUpdate({
                email: email
            }, {
                verification_token: verificationToken,
                verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME
            }, { new: true });
            if (user) {
                NodeMailer.sendEmail({
                    to: [user.email],
                    subject: 'BaggageApp - Resent Token',
                    html: `<h2>Dear ${user.name} </h2><h3>Your Email varification code is : ${verificationToken}</h3> <br/><br/><h3> We are happy to see you with us.</h3><h3>Team BaggageApp<h3/>`
                });
                res.send(user);
            } else {
                throw Error("User Does't Exits");
            }
        } catch (e) {
            next(e);
        }
    }

    static async login(req, res, next) {
        const password = req.query.password;
        const user = req.user;
        try {
            await Utils.passwordCompare({ password: password, encryptPassword: user.password });
            const token = Jwt.sign({ email: user.email, user_id: user._id },
                getEnvironmentVariables().jwt_secret,
                { expiresIn: '120d' });
            const data = {
                "token": token,
                "user": user
            };
            res.json(data)

        } catch (e) {
            next(e)
        }

    }

    static async updatePassword(req, res, next) {
        const user_id = req.user.user_id;
        const password = req.body.password;
        const newPassword = req.body.new_password;
        try {
            const user: any = await User.findOne({ "_id": user_id });
            await Utils.passwordCompare({ "password": password, "encryptPassword": user.password });
            const encryptPassword = await Utils.encryptPassword(newPassword);
            const newUser = await User.findOneAndUpdate({ "_id": user_id }, { "password": encryptPassword }, { new: true });
            if (newUser) {
                NodeMailer.sendEmail({
                    to: [user.email],
                    subject: 'BaggageApp - Password reseted successfully',
                    html: `<h2>Dear ${user.name} </h2><h3> Your password successfull reseted, Please let us know if you did't </h3> <br/><br/><h3> We are happy to see you with us.</h3><h3>Team BaggaeApp</h3>`
                });
            }
            res.send(newUser);
        } catch (e) {
            next(e);
        }
    }

    static async sendResetPasswordEmail(req, res, next) {
        const email = req.query.email;
        const resetPasswordToken = Utils.generateVerificationToken();
        try {
            const updatedUser: any = await User.findOneAndUpdate(
                { "email": email },
                {
                    "updated_at": new Date,
                    "reset_password_token": resetPasswordToken,
                    "reset_password_token_time": Date.now() + new Utils().MAX_TOKEN_TIME
                },
                {
                    new: true
                }
            );

            await NodeMailer.sendEmail({
                to: [email],
                subject: 'BaggageApp - Reset Password',
                html: `<h2>Dear ${updatedUser.name}</h2><h3>Your Reset Password code is : ${resetPasswordToken}</h3> <br/><br/><h3> We are happy to see you with us.</h3><h3>Team BaggageApp</h3>`
            });
            res.send(updatedUser);
        } catch (e) {
            next(e)
        }
    }

    static verifyResetPasswordToken(req, res, next) {
        res.send('Your password has been updated successfully');
    }

    static async resetPassword(req, res, next) {
        const user = req.user;
        const newPassword = req.body.new_password;
        try {
            const encryptPassword = await Utils.encryptPassword(newPassword);
            const updatedUser: any = await User.findOneAndUpdate(
                { "_id": user._id },
                {
                    "updated_at": new Date(),
                    "password": encryptPassword
                },
                {
                    new: true
                }
            )
            await NodeMailer.sendEmail({
                to: [updatedUser.email],
                subject: 'BaggageApp - Password reseted',
                html: `<h2>Dear ${updatedUser.name}</h2><h3>Your password has been reseted successfully.</h3> <br/><br/><h3> We are happy to see you with us.</h3><h3>Team BaggageApp</h3>`
            });
            res.send(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    static async uploadProfilePic(req, res, next) {
        const userId = req.user.user_id;
        const fileUrl = 'http://localhost:4000/' + req.file.path.replaceAll('\\', '/');
        try {
            const user = await User.findOneAndUpdate({
                _id: userId
            },
                {
                    updated_at: new Date(),
                    profilePhoto: fileUrl
                }, { new: true })
            res.send(user)
        } catch (e) {
            next(e);
        }
    }


    static async UpdateProfile(req, res, next) {

        const user_id = req.user.user_id;
        const user_name = req.body.name;
        const user_dob = req.body.dateOfBirth;
        const user_phone = req.body.phone;
        const user_address = req.body.address;
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user_id },
                {
                    name: user_name,
                    dateOfBirth: user_dob,
                    phone: user_phone,
                    address: user_address
                },
                {
                    new: true
                }
            );
            res.send(updatedUser)
        } catch (e) {
            next(e);
        }

    }

    static async fatchUser(req, res, next) {
        const user_id = req.user.user_id;
        try {
            const user: any = await User.findOne({ "_id": user_id });
            res.send(user);
        } catch (e) {
            next(e)
        }
    }
}