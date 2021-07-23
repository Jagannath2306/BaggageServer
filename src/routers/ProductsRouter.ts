import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
import { UserController } from '../controllers/UserController';
import { GlobalMiddleWare } from '../middlewares/globalMiddleware';
import { ProductsValidater } from '../validators/ProductsValidators';



class ProductsRouter {
    public router: Router;

    constructor() {
        this.router = Router();

        this.getRoutes()
        this.postRoutes()
        this.patchRoutes()
        this.deleteRoutes()
    }


    getRoutes() {

    }

    // postRoutes() {
    //     this.router.post('/register', ProductsValidater.RegisterProduct(), ProductsController.RegisterProduct)
    // }

    patchRoutes() {

    }

    deleteRoutes() {

    }
}

export default new ProductsRouter().router;