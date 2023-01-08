import { ObjectSchema, string } from "joi";
import * as joi from 'joi';

export const createPostSchema : ObjectSchema = joi.object({
    title : joi.string().required(),
    content : joi.string().required()
});

export const editPostSchema : ObjectSchema = joi.object({
    id : joi.number().required(),
    title : joi.string().optional(),
    content : joi.string().optional()
});

export const deletePostSchema : ObjectSchema = joi.object({
    id : joi.number().required()
});

export const getPostSchema : ObjectSchema = joi.object({
    slug : joi.string().required()
});

export const getPostsSchema : ObjectSchema = joi.object({
    views : joi.boolean().default(true).optional(),
    posted : joi.date().optional(),
    posted_direction : joi.string().valid('gte', 'lte').optional().default('gte'),
    offset : joi.number().optional().default(0),
    limit : joi.number().optional().default(10)
});