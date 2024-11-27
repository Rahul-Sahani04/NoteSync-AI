// require('dotenv').config({path: "backend/.env"})
require('dotenv').config()
if(process.env.REACT_APP_NODE_ENV == "LOCAL"){
    require('dotenv').config({path: "backend/.env"})
}
const jwt = require('jsonwebtoken');
const {userSchema, userSchemaLogin, newNoteSchema} = require('./joiSchema')
const ExpressError = require('./utils/ExpressError')

module.exports.validateUserRegister = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        console.log(error);
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.validateUserLogin = (req, res, next) => {
    const { error } = userSchemaLogin.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

module.exports.fetchUser = (req, res, next) => {
    // Get user from jwt token and add id to req object
    const token = req.header('auth-token')
    if (token) {
        const secretKey = process.env.JWT_SECRET_KEY;
        if (!secretKey) {
            throw new Error('Secret key is not defined');
        }
        const data = jwt.verify(token, secretKey);
        req.user = data.user
        next()
    } else {
        res.status(401).json({message: "Please authenticate with a valid Token"})  //401 acess denied
    }
}

module.exports.validateNewNote = (req,res, next) => {
    const { error } = newNoteSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        // console.log(msg);
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}
