import { ObjectSchema } from "joi";
import * as joi from "joi";

export const signupSchema : ObjectSchema = joi.object({
    name : joi.string().required(),
    email : joi.string().email().required(),
    password : joi.string().min(8)
});

export const loginSchema : ObjectSchema = joi.object({
    email : joi.string().required().email(),
    password : joi.string().required().min(8)
});
