import { ObjectSchema } from "joi";
import * as joi from 'joi';

export const likeUnlikeSchema = joi.object({
    post_id : joi.number().required()
});