import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
        },
        likedArticles: [{ type: Types.ObjectId, ref: 'Article' }],
    },
    { timestamps: true }
);

UserSchema.pre<User>('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    } catch (error: any) {
        return next(error);
    }
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<User>('User', UserSchema);
