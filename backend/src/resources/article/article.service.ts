import UserModel from '@/resources/user/user.model';
import ArticleModel from '@/resources/article/article.model';
import Article from '@/resources/article/article.interface';

interface Comment {
    comment: string;
    user: string;
}

class ArticleService {
    private Article = ArticleModel;
    private user = UserModel;

    /**
     * Create a new Article
     */
    public async create(
        title: string,
        text: string,
        category: [string],
        tags: [string],
        comments: Comment[] = [],
        likes: number = 0,
        dislikes: number = 0
    ): Promise<Article> {
        try {
            const ArticleId = Math.random().toString(36).substr(2, 9);
            const Article = await this.Article.create({
                title,
                text,
                category,
                tags,
                comments,
                likes,
                dislikes,
                ArticleId,
            });
            return {
                title: Article.title,
                text: Article.text,
                category: Article.category,
                tags: Article.tags,
                comments: Article.comments,
                likes: Article.likes,
                dislikes: Article.dislikes,
                ArticleId: Article.ArticleId,
            } as Article;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get all Article
     */
    public async get(): Promise<Article[]> {
        try {
            const Articles = await this.Article.find()
                .populate({
                    path: 'comments.user',
                    select: 'name',
                })
                .select('-_id -__v');
            if (Articles.length == 0) {
                throw new Error('Articles Not Found');
            }
            return Articles;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get a Article by ArticleId
     */
    public async getById(ArticleId: string): Promise<Article> {
        try {
            const Article = await this.Article.findOne({ ArticleId })
                .populate({
                    path: 'comments.user',
                    select: 'name',
                })
                .select('-_id -__v');
            if (Article == null) {
                throw new Error('Article Not Found');
            }
            return Article;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Add a comment to an Article
     */
    public async addComment(
        ArticleId: string,
        comment: Comment
    ): Promise<Article> {
        try {
            const updatedArticle = await this.Article.findOneAndUpdate(
                { ArticleId },
                { $push: { comments: comment } },
                { new: true }
            )
                .populate({
                    path: 'comments.user',
                    select: 'name',
                })
                .select('-_id -__v');
            if (updatedArticle == null) {
                throw new Error('Article Not Found');
            }
            return updatedArticle;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Like an Article
     */
    public async like(ArticleId: string, userId: string): Promise<Article> {
        try {
            const updatedArticle = await this.Article.findOneAndUpdate(
                { ArticleId },
                { $inc: { likes: 1 } },
                { new: true }
            ).select('-__v');
            if (updatedArticle == null) {
                throw new Error('Article Not Found');
            }

            const updatedUser = await this.user.findByIdAndUpdate(
                userId,
                { $addToSet: { likedArticles: updatedArticle._id } },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error('Failed to update user');
            }
            return updatedArticle;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Dislike an Article
     */
    public async dislike(ArticleId: string): Promise<Article> {
        try {
            const updatedArticle = await this.Article.findOneAndUpdate(
                { ArticleId },
                { $inc: { dislikes: 1 } },
                { new: true }
            ).select('-_id -__v');
            if (updatedArticle == null) {
                throw new Error('Article Not Found');
            }
            return updatedArticle;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search for Articles by category and/or tags based on query
     */
    public async search(query?: string): Promise<Article[]> {
        try {
            const filter: any = {};
            if (query) {
                filter['$or'] = [
                    { category: { $regex: query, $options: 'i' } },
                    { tags: { $regex: query, $options: 'i' } },
                ];
            }
            console.log(filter);
            const articles = await this.Article.find(filter).select(
                '-_id -__v'
            );
            return articles;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default ArticleService;
