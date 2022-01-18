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
        this.router.patch('/update/cart', GlobalMiddleWare.authenticate, UserValidators.userCart(), GlobalMiddleWare.checkError, UserController.UserCart);
        this.router.patch('/update/orders', GlobalMiddleWare.authenticate, UserValidators.userOrders(), GlobalMiddleWare.checkError, UserController.UserOrders);
        this.router.patch('/update/address', GlobalMiddleWare.authenticate, UserValidators.userAddress(), GlobalMiddleWare.checkError, UserController.UpdateAddress);
        this.router.patch('/update/cards', GlobalMiddleWare.authenticate, UserValidators.userCards(), GlobalMiddleWare.checkError, UserController.UpdateCards);
    }

    deleteRoutes() {
        this.router.delete('/update/cart/delete', GlobalMiddleWare.authenticate, UserValidators.userCartDelete(), GlobalMiddleWare.checkError, UserController.userCartDelete);
        this.router.delete('/delete/address', GlobalMiddleWare.authenticate, UserValidators.userAddressDelete(), GlobalMiddleWare.checkError, UserController.userAddressDelete);
    }
}

export default new UserRouter().router;