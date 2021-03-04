import { body } from 'express-validator';
import User from '../models/User';

export class UserValidators {
    static SignUp() {
        return [
            body("name", "Name is Required").isString(),
            body("email", "Email is Required").isEmail().custom((email, { req }) => {
                return User.findOne({ email: email }).then((user) => {
                    if (user) {
                        throw new Error("User Already Exist.");
                    } else {
                        return true;
                    }
                })
            }),

            body("password", "Password is Required").isString(), body("password", "Password must be from 8 - 20 Characters only.").isLength({ min: 8, max: 20 })
        ]
    }

    static verifyUser() {
        return [
            body("verification_token", "Verification Token is Required").isNumeric(),
            body("email", "Email is Required").isEmail()
        ]
    }
}