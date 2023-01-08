import { ObjectSchema, string } from "joi";
import * as joi from 'joi';

export const createPostSchema : ObjectSchema = joi.object({
    title : joi.string().required(),
    content : joi.string().required()
});