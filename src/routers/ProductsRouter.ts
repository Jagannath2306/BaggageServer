import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
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

    postRoutes() {
        this.router.post('/register', ProductsValidater.RegisterProduct(), GlobalMiddleWare.checkError, ProductsController.RegisterProduct)
    }

    patchRoutes() {

    }

    deleteRoutes() {

    }
}

export default new ProductsRouter().router;