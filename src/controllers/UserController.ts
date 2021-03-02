import User from "../models/User";
import { validationResult } from 'express-validator';

export class UserController {
    // User Signup controller start here
    static SignUp(req, res, next) {
        const error = validationResult(req);

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
        
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
            return;
        }
        const user = new User({
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
            updated_at: updated_at
        })

        user.save().then((user) => {
            res.status(201).send(user);
        }).catch((err) => {
            const error = new Error(err);
            next(error);
        })
    }


    // User Signup controller end here
    static login(req, res, next) {
        const err = new Error("User does't exist");
        // console.log(err)
        next(err);
    }
}