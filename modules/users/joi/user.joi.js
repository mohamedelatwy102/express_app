const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");

module.exports = {
    addUserSchema : {
        body : Joi.object().required().keys({
            userName : Joi.string().required().messages({
                'any.required' : "the userName  is required",
                "string.empty" : "the userName is not allowed to be empty",
                "string.base" : "the userName must be string"
            }),
            email : Joi.string().email().required().messages({
                'any.required' : "the email is required",
                "string.empty" : "the email is not allowed to be empty",
                "string.base" : "the email must be string",
                "string.email" : "the email must be valid email"
            }),
            password : passwordComplexity().required(),
            role : Joi.string().required().messages({
                'any.required' : "the role is required",
                "string.empty" : "the role is not allowed to be empty",
                "string.base" : "the role must be string"
            })
        })
    },
    updateUserSchema : {
        body : Joi.object().required().keys({
            email : Joi.string().email().required()
        })
    },
    loginSchema : {
        body : Joi.object().required().keys({
            email : Joi.string().email().required().messages({
                'any.required' : "the email is required",
                "string.empty" : "the email is not allowed to be empty",
                "string.base" : "the email must be string",
                "string.email" : "the email must be valid email"
            }),
            password : Joi.string().required().messages({
                'any.required' : "the password is required",
                "string.empty" : "the password is not allowed to be empty",
                "string.base" : "the password must be string"
            })
        })
    }
}