import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';
import Controller from '@/utils/interfaces/controller.interface';
import {
    errorMiddleware,
    routeNotFoundMiddleware,
} from '@/middleware/error.middleware';
import helmet from 'helmet';
class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(
            '/api-docs',
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec)
        );

        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
        this.express.use(routeNotFoundMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        const { MONGO_PATH } = process.env;

        mongoose.connect(`${MONGO_PATH}`);
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(
                `Backend is listening on http://localhost:${this.port}`
            );
        });
    }
}

export default App;
