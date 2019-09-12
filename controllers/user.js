
const User = require('../models/user')
const { generateToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcryptjs')

class UserController {
    static register(req, res, next) {
        let { email, password } = req.body

        User.create({ email, password })
            .then(user => {
                res.status(201).json({user})
            })
            .catch(next)
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({ email })
            .then(user => {
                if (user && compareHash(password, user.password)) {
                    const payload = {
                        userId: user._id,
                        email
                    }

                    const token = generateToken(payload)

                    res.status(200).json({token})
                } else next({
                    status: 403,
                    message: `Invalid username / password`
                })
            })
              .catch(next)
    }
}

module.exports = UserController