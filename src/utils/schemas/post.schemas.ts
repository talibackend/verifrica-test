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
})