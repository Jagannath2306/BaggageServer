import User from "../models/User";
import { Utils } from "../utils/utils";
import { NodeMailer } from "../utils/NodeMailer";

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
        const data = {
            name: name,
            email: email,
            password: password,
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
        try {
            let user = await new User(data).save();
            await NodeMailer.sendEmail({
                to: ["jagananthjena2306@gmail.com"],
                subject: 'Email varification',
                html: `<h1>${verificationToken}<h1/>`
            });
            res.send(user);
        } catch (e) {
            next(e);
        }
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
}