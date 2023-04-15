import { Document } from 'mongoose';

export default interface Article extends Document {
    ArticleId: string;
    title: string;
    text: string;
    category: [string];
    tags: [string];
    likes: number;
    dislikes: number;
    comments: [string];
}
