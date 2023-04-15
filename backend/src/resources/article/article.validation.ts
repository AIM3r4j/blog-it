import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    category: Joi.array().required(),
    tags: Joi.array().required(),
    likes: Joi.number().optional(),
    dislikes: Joi.number().optional(),
    comments: Joi.array().optional(),
});
const addComment = Joi.object({
    comment: Joi.string().required(),
});
const get = Joi.object({});

export default { create, get, addComment };
