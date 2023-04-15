import { Schema, Types, model } from 'mongoose';
import Article from '@/resources/article/article.interface';

const ArticleSchema = new Schema({
    ArticleId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    category: {
        type: Array,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    likes: {
        type: Number,
    },
    dislikes: {
        type: Number,
    },
    comments: [
        {
            comment: {
                type: String,
                required: true,
            },
            user: {
                type: Types.ObjectId,
                ref: 'User',
                required: true,
            },
        },
    ],
});

export default model<Article>('Article', ArticleSchema);
