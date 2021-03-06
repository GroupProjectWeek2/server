
const router = require('express').Router()
const ImageController = require('../controllers/image')
const images = require('../helpers/image')
const getLabel = require('../helpers/getLabel')
const checker = require('../helpers/imagechecker')
// get all image
router.get('/', ImageController.getAllImages)

// upload an image
router.post('/', images.multer.single('image'), checker, getLabel, images.sendUploadToGCS, ImageController.uploadImage)

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