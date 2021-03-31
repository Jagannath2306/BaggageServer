import { body } from 'express-validator';
import { query } from 'express-validator';
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
            body("verification_token", "Verification Token is Required").isNumeric()
        ]
    }

    static resendVerificationEmail() {
        return [
            query("email", "Email is Required").isEmail()
        ]
    }
    static login() {
        return [
            query("email", "Email is Required").isEmail().custom((email, { req }) => {
                return User.findOne({ email: email }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    } else {
                        throw new Error("User Does Not Exist");
                    }
                })
            }),
            query("password", "Password is Required").isAlphanumeric()
        ]
    }

    static updatePassword() {
        return [
            body("password", "Password is Required").isAlphanumeric(),
            body("confirm_password", "Confirm Password is Required").isAlphanumeric(),
            body("new_password", "New Password is Required").isAlphanumeric().custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                } else {
                    throw new Error('Password and Conform Password Does Not Match.');
                }
            }),
        ]
    }

    static sendResetPasswordEmail() {
        return [
            query("email", "Email is Required").isEmail().custom((email, { req }) => {
                return User.findOne({ "email": email }).then((user) => {
                    if (user) {
                        return true;
                    } else {
                        throw new Error('User Does Not Exist.');
                    }
                })
            })
        ];
    }

    static verifyResetPasswordToken() {
        return [
            query("reset_password_token", "Reset Password Token Is Required")
                .isNumeric().custom((token, { req }) => {
                    return User.findOne({
                        "reset_password_token": token
                        // "reset_password_token_time": { $gt: Date.now() }
                    }).then((user) => {
                        if (user) {
                            return true;
                        } else {
                            throw new Error('Token does not exit, Please request a new one.')
                        }
                    });
                })
        ]
    }

    static resetPassword() {
        return [
            body("email", 'Email Is Required').isEmail().custom((email, { req }) => {
                return User.findOne({ "email": email }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    } else {
                        throw new Error("User Does Not Exist");
                    }
                })
            }),
            body('new_password', 'New Password Is Required').isAlphanumeric().custom((newPassword, { req }) => {
                if (newPassword === req.body.confirm_password) {
                    return true;
                } else {
                    throw new Error("Confirm Password And New Password Does Not Match.")
                }
            }),
            body('confirm_password', 'Confirm Password Is Required').isAlphanumeric(),
            body('reset_password_token', 'Reset Password Token Is Required').isNumeric().custom((token, { req }) => {
                if (Number(req.user.reset_password_token) === Number(token)) {
                    return true;
                } else {
                    req.errorStatus = 422;
                    throw new Error("Reset Password Token Is Invalid. Please try again");
                }
            })
        ]
    }

    static updateProfilePic() {
        return [
            body("profilePhoto").custom((profilePic, { req }) => {
                if (req.file) {
                    return true;
                } else {
                    throw new Error('File not uploaded');
                }
            })
        ]
    }
}