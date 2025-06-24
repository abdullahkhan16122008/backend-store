let Joi = require('joi')

let userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match password'
    }),
})
let loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
})


let signupValidation = async (req,res,next) => {
try{

    let {error} = userSchema.validate(req.body)
    if(error){
        return res.status(400).json({message: error, auth: false})
    }
    next()
}catch(e){
    let error = {
        status: 500,
        message: 'Internal server issue'
    }
    next(error)
}
    
}
let loginValidation = async (req,res,next) => {
try{

    let {error} = loginSchema.validate(req.body)
    if(error){
        return res.status(400).json({message:`${error}`, auth: false})
    }
    next()
}catch(e){
    let error = {
        status: 500,
        message: 'Internal server issue'
    }
    next(error)
}
    
}


module.exports = { signupValidation, loginValidation }
