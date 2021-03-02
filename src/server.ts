import bodyParser = require('body-parser');
import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnvironmentVariables } from './environments/env';
import UserRouter from './routers/UserRouter';

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
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    setRoutes() {
        this.app.use('/api/user', UserRouter)
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