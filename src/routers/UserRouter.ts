import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { GlobalMiddleWare } from '../middlewares/globalMiddleware';
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
        // this.router.post('/login', UserController.login);
    }
    
    postRoutes() {
        this.router.post('/signup', UserValidators.SignUp(), GlobalMiddleWare.checkError, UserController.SignUp);
    }

    patchRoutes() {
        this.router.patch('/verify', UserValidators.verifyUser(), GlobalMiddleWare.checkError, UserController.Verify);
    }

    deleteRoutes() {

    }
}

export default new UserRouter().router;