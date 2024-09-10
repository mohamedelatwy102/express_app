const Joi = require('joi')


module.exports = {
    addBlogSchema : {
        body : Joi.object().required().keys({
            title : Joi.string().required().messages({
                'any.required' : "the title  is required",
                "string.empty" : "the title is not allowed to be empty",
                "string.base" : "the title must be string"
            }),
            description : Joi.string().required().messages({
                'any.required' : "the description is required",
                "string.empty" : "the description is not allowed to be empty",
                "string.base" : "the description must be string",
                
            })
        })
    }
}