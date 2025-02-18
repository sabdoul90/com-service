const joi = require('joi');

exports.signupValidator = joi.object({
    email : joi.string().
    min(6)
    .max(60)
    .required().
    email({tlds:{allow:['com', 'net']}}),
    password : joi.string().min(6).pattern(new RegExp('[A-Z]'))
    .pattern(new RegExp('[a-z]')) 
    .pattern(new RegExp('[0-9]')) 
    .pattern(new RegExp('[!@#$%^&*(),.?":{}|<>]'))
    .required()
});