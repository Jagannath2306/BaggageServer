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
        const dateOfBirth = req.body.dateOfBirth;
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
                        dateOfBirth: dateOfBirth,
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
                        subject: 'Email varification',
                        html: `<h2>Hello ${data.name}, </h2>
                        <h3>Welcome to BaggageApp </h3> 
                        <h3> You have been Successfull Singed in to Baggage App </h3>
                        <h3>Click <a href='http://localhost:4200/user'>here</a> to Login</h3>
                         <br/><br/><p> We are happy to see you with us.</p>`
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
                    subject: 'Email Verification',
                    html: `<h2>Hello ${user.name} </h2><h3>Good Day!!! , Welcome to BaggageApp </h3> <p>Your Email varification code is : ${verificationToken}</p> <br/><br/><p> We are happy to see you with us.</p>`
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
            res.send(newUser);
        } catch (e) {
            next(e);
        }
    }

    static async sendResetPasswordEmail(req, res, next) {
        const email = req.query.email;
        const resetPasswordToken = Utils.generateVerificationToken();
        try {
            const updatedUser = await User.findOneAndUpdate(
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
            res.send(updatedUser);
            await NodeMailer.sendEmail({
                to: [email],
                subject: 'Reset Password Email',
                html: `<h2>Hello Dear </h2><h3>Good Day!!! </h3> <p>Your Reset Password code is : ${resetPasswordToken}</p> <br/><br/><p> We are happy to see you with us.</p>`
            });
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
            const updatedUser = await User.findOneAndUpdate(
                { "_id": user._id },
                {
                    "updated_at": new Date(),
                    "password": encryptPassword
                },
                {
                    new: true
                }
            )
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