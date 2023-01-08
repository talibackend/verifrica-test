import { ObjectSchema } from 'joi';
import * as joi from 'joi';

export const followSchema = joi.object({
    user_id : joi.number().required()
});