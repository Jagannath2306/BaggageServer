import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { GlobalMiddleWare } from '../middlewares/globalMiddleware';
import { Utils } from '../utils/utils';
import { UserValidators } from '../validators/UserValidators';

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes()
        this.postRoutes()
        this.patchRoutes()
        this.deleteRoutes()
    }


    getRoutes() {
        this.router.get('/send/verification/email', GlobalMiddleWare.authenticate, UserController.ResendVerificationEmail);
        this.router.get('/login', UserValidators.login(), GlobalMiddleWare.checkError, UserController.login);
        this.router.get('/reset/password', UserValidators.sendResetPasswordEmail(), GlobalMiddleWare.checkError, UserController.sendResetPasswordEmail);
        this.router.get('/verify/resetPasswordToken', UserValidators.verifyResetPasswordToken(), GlobalMiddleWare.checkError, UserController.verifyResetPasswordToken);
        this.router.get('/fatch', GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError, UserController.fatchUser);
    }

    postRoutes() {
        this.router.post('/signup', UserValidators.SignUp(), GlobalMiddleWare.checkError, UserController.SignUp);
    }

    patchRoutes() {
        this.router.patch('/verify', GlobalMiddleWare.authenticate, UserValidators.verifyUser(), GlobalMiddleWare.checkError, UserController.Verify);
        this.router.patch('/update/password', GlobalMiddleWare.authenticate, UserValidators.updatePassword(), GlobalMiddleWare.checkError, UserController.updatePassword);
        this.router.patch('/reset/password', UserValidators.resetPassword(), GlobalMiddleWare.checkError, UserController.resetPassword);
        this.router.patch('/update/profile', GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError, UserController.UpdateProfile);
        this.router.patch('/update/profilePic', GlobalMiddleWare.authenticate,
            new Utils().Multer.single('profilePhoto'), UserValidators.updateProfilePic(), GlobalMiddleWare.checkError, UserController.uploadProfilePic);

    }

    deleteRoutes() {

    }
}

export default new UserRouter().router;