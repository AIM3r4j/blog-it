import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import authenticated from '@/middleware/authenticated.middleware';
import { cacheMiddleware } from '@/middleware/cache.middleware';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(
            `${this.path}/profile`,
            authenticated,
            cacheMiddleware,
            this.fetchProfile
        );
        this.router.post(
            `${this.path}/profile/update`,
            authenticated,
            validationMiddleware(validate.updateProfile),
            this.updateProfile
        );
        this.router.get(`${this.path}`, authenticated, this.getUser);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;

            const user = await this.UserService.register(name, email, password);

            res.status(201).json({ user });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.UserService.login(email, password);

            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }

        res.status(200).send({ data: req.user });
    };

    private fetchProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.user;

            const user = await this.UserService.fetchProfile(_id);

            res.status(200).json({ user: user });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name } = req.body;
            const { _id } = req.user;

            const updatedUser = await this.UserService.updateProfile(_id, name);

            res.status(200).json({ user: updatedUser });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;
