import User from "../models/User";

export class UserController {
    // User Signup controller start here
    static Signup(req, res, next) {
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
            profilePhoto: profilePhoto
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

        res.send(req.body);
    }
}