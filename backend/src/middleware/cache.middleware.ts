import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://localhost:6379',
    socket: {
        reconnectStrategy: () => {
            // retry after 5 seconds
            return 5000;
        },
    },
});

(async () => {
    await redisClient.connect();
    redisClient.on('error', (err: Error) => {
        console.error('Redis error:', err);
    });
})();

const CACHE_PREFIX = 'myapp:';

export const cacheMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const key = CACHE_PREFIX + req.originalUrl;

    redisClient
        .get(key)
        .then((cachedData: any) => {
            if (cachedData !== null) {
                res.send(JSON.parse(cachedData));
            } else {
                const sendResponse = res.send.bind(res);
                res.send = (body: any) => {
                    redisClient.setEx(key, 60 * 60, JSON.stringify(body));
                    return sendResponse(body);
                };
                next();
            }
        })
        .catch((err: Error) => {
            console.error('Redis error:', err);
            next();
        });
};
