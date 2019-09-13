
const router = require('express').Router()
const ImageController = require('../controllers/image')
const gcs = require('../helpers/gcs')

// get all image
router.get('/', ImageController.getAllImages)

// upload an image
router.post('/', gcs.multer.single('image'), gcs.sendUploadToGCS, ImageController.uploadImage)
// router.post('/', ImageController.uploadImage) // without tags

// get single image
router.get('/:id', ImageController.getImage)

// delete image from database
router.delete('/:id', ImageController.delete)

// favorite an image
router.post('/favorites/:id', ImageController.favImage)

// unfav an image
router.delete('/favorites/:id', ImageController.unFavImage)

// search image
router.get('/search/:tag', ImageController.searchByTag)

module.exports = router