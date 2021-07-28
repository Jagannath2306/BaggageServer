import { Router } from 'express';
import { ProductsController } from '../controllers/ProductsController';
import { GlobalMiddleWare } from '../middlewares/globalMiddleware';
import { Utils } from '../utils/utils';
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
        this.router.get('/get/products', GlobalMiddleWare.checkError, ProductsController.GetProducts);
    }

    postRoutes() {
        this.router.post('/register', new Utils().Multer.single('itemImage'), ProductsValidater.RegisterProduct(), GlobalMiddleWare.checkError, ProductsController.RegisterProduct)
    }

    patchRoutes() {

    }

    deleteRoutes() {

    }
}

export default new ProductsRouter().router;