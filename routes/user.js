
const router = require('express').Router()
const UserController = require('../controllers/user')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/oauth', UserController.googleLogin)

router.use(authentication)
router.get('/fav', UserController.myFav)

module.exports = router