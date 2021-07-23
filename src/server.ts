import bodyParser = require('body-parser');
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariables } from './environments/env';
import ProductsRouter from './routers/ProductsRouter';
import UserRouter from './routers/UserRouter';

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        "Authorization"
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: "*",
    preflightContinue: false,
};

export class Server {
    public app: express.Application = express();
    constructor() {
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfigurations() {
        this.connectMangodb()
        this.configureBodyParser()
    }

    connectMangodb() {
        mongoose.connect(getEnvironmentVariables().db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }, (error) => {
            if (error) {
                console.log('Error! ' + error);
            } else {
                console.log("Connected to Mongodb");
            }
        })
    }

    configureBodyParser() {
        const bodyParser = require("body-parser")
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use("*", cors(options));
    }

    setRoutes() {
        this.app.use('/src/uploads', express.static('src/uploads'));
        this.app.use('/api/user', UserRouter);
        // this.app.use('/api/product', ProductsRouter);
    }

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status: 404
            })
        })
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong, Please try Again',
                status: errorStatus
            })
        })
    }
}