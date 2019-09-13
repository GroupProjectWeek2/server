
const router = require('express').Router()
const userRouter = require('./user')
const imageRouter = require('./image')
const { authentication } = require('../middlewares/auth')

router.get('/', (req, res) => {
    res.status(200).json({
        message: `App is running. . .`
    })
})

router.use('/users', userRouter)

//router.use(authentication)
router.use('/images', imageRouter)

module.exports = router