import { Router } from 'express';
import { UserController } from '../controllers/UserController';
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
        this.router.post('/login', UserController.login);
    }
    postRoutes() {
        this.router.post('/signup', UserValidators.SignUp(), UserController.SignUp);
    }
    patchRoutes() {

    }
    deleteRoutes() {

    }
}

export default new UserRouter().router;