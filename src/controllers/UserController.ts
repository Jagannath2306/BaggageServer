import User from "../models/User";
import { Utils } from "../utils/utils";
import { NodeMailer } from "../utils/NodeMailer";
import * as Bcrypt from 'bcrypt';
import { resolve } from "path";

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
            const hash = await UserController.encryptPassword(req, res, next);
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
                        html: `<h2>Hello ${data.name} </h2><h3>Good Day!!! , Welcome to BaggageApp </h3> <p>Your Email varification code is : ${verificationToken}</p> <br/><br/><p> We are happy to see you with us.</p>`
                    });
                res.send(user);
        } catch (e) {
            next(e);
        }
    }

    private static async encryptPassword(req, res, next) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(req.body.password, 10, ((err, hash) => {
                if (err) {
                    reject(err);
                    next(err)
                } else {
                    resolve(hash);
                }
            }))
        })
    }

    static async Verify(req, res, next) {
        const verificationToken = req.body.verification_token;
        const email = req.body.email;
        console.log(req.body)
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
        const email = req.query.email;
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

}