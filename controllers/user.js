const { User } = require('../models')
const { createToken } = require('../helpers/jwt')
const { checkPassword } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(response => {
                let { id, email } = response
                let token = createToken({ id, email })
                let avatar = `https://api.adorable.io/avatars/200/${email}.png`
                return res.status(201).json({
                    email,
                    token: token,
                    avatar: avatar
                })
            })
            .catch(err => {
                return next(err)
            })
    }
    static login(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email: email }})
            .then(response => {
                const decrypted = checkPassword(password, response.password)
                if(!response) {
                    throw { status: 400, type: 'Bad Request', msg: 'Wrong email or password'}
                }
                else if(!decrypted) {
                    throw { status: 400, type: 'Bad Request', msg: 'Wrong email or password' }
                }
                else {
                    let payload = {
                        id: response.id,
                        email: response.email
                    }
                    let token = createToken(payload)
                    return res.status(200).json({
                        email: payload.email, 
                        token: token, 
                        avatar: `https://api.adorable.io/avatars/200/${response.email}.png` 
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }
    static googleSignIn(req, res, next) {
        let googleToken = req.headers.token
        let newUser = {}
        client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.CLIENT_ID
        }).then(ticket => {
            let payload = ticket.getPayload()
            let userId = payload['sub']
            let userEmail = payload.email
            newUser.email = payload.email
            newUser.password = process.env.DEFAULT_PASS
            return User.findOne({where: {email: userEmail}})
        })
        .then(response => {
            if(response) {
                let payload = {
                    id: response.id,
                    email: response.email
                }
                let token = createToken(payload)
                return res.status(200).json({
                    email: payload.email, 
                    token: token, 
                    avatar: `https://api.adorable.io/avatars/200/${response.email}.png` 
                })
            }
            else {
                return User.create(newUser)
            }
        })
        .then(response => {
            let payload = {
                id: response.id,
                email: response.email
            }
            let token = createToken(payload)
            return res.status(201).json({ 
                email: payload.email, 
                token: token, 
                avatar: `https://api.adorable.io/avatars/200/${response.email}.png` 
            })
        })
        .catch(err => next(err))
    }
}
module.exports = UserController