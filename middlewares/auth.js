
const { verifyToken } = require('../helpers/jwt')

function authentication(req, res, next) {
    const { token } = req.headers

    try {
        req.decode = verifyToken(token)
        next()
    } catch (err) { next({ status: 403, message: `Please login first` }) }
}

module.exports = { authentication }