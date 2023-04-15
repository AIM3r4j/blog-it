import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    res.status(status).send({
        status,
        message,
    });
}
const routeNotFoundMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const error = new HttpException(404, 'Route not found');
    res.status(404).send({
        status: '404',
        message: error.message,
    });
};

export { errorMiddleware, routeNotFoundMiddleware };
