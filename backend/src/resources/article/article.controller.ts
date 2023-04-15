import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import authenticatedMiddleware from '@/middleware/authenticated.middleware';
import validate from '@/resources/article/article.validation';
import ArticleService from '@/resources/article/article.service';
import { cacheMiddleware } from '@/middleware/cache.middleware';

class ArticleController implements Controller {
    public path = '/articles';
    public router = Router();
    private ArticleService = new ArticleService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            authenticatedMiddleware,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(
            `${this.path}/`,
            authenticatedMiddleware,
            validationMiddleware(validate.get),
            cacheMiddleware,
            this.get
        );
        this.router.get(
            `${this.path}/:ArticleId`,
            authenticatedMiddleware,
            validationMiddleware(validate.get),
            cacheMiddleware,
            this.getById
        );
        this.router.get(
            `${this.path}/search`,
            authenticatedMiddleware,
            cacheMiddleware,
            this.search
        );

        this.router.put(
            `${this.path}/:articleId/comments`,
            authenticatedMiddleware,
            validationMiddleware(validate.addComment),
            this.addComment
        );
        this.router.put(
            `${this.path}/:articleId/like`,
            authenticatedMiddleware,
            this.like
        );
        this.router.put(
            `${this.path}/:articleId/dislike`,
            authenticatedMiddleware,
            this.dislike
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, text, category, tags } = req.body;

            const Article = await this.ArticleService.create(
                title,
                text,
                category,
                tags
            );

            res.status(201).json({ Article });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
    private getById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { ArticleId } = req.params;
            const Article = await this.ArticleService.getById(ArticleId);

            res.status(200).json({ Article });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const Articles = await this.ArticleService.get();

            res.status(200).json({ Articles });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private search = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { query } = req.query;
            const searchResults = await this.ArticleService.search(
                JSON.stringify(query)
            );

            res.status(200).json({ searchResults });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private addComment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { articleId } = req.params;
            const { comment } = req.body;
            const user = req.user._id;

            const updatedArticle = await this.ArticleService.addComment(
                articleId,
                { comment, user }
            );

            res.status(200).json({ article: updatedArticle });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private like = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { articleId } = req.params;
            const userId = req.user._id;
            const updatedArticle = await this.ArticleService.like(
                articleId,
                userId
            );

            res.status(200).json({ article: updatedArticle });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private dislike = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { articleId } = req.params;
            const updatedArticle = await this.ArticleService.dislike(articleId);
            res.status(200).json({ article: updatedArticle });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ArticleController;
