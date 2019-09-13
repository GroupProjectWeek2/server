
const Image = require('../models/image')
const User = require('../models/user')
const vision = require('@google-cloud/vision')

const client = new vision.ImageAnnotatorClient()

class ImageController {
    // get all image
    static getAllImages(req, res, next) {
        Image.find().populate('tag')
            .then(images => {
                res.status(200).json(images)
            })
            .catch(next)
    }

    // upload an image
    static uploadImage(req, res, next) {
        const { title} = req.body
        const { userId } = req.decode
        const url = req.file.cloudStoragePublicUrl
        const tag = req.labels
            
        Image.create({ title, url, userId, tag })
            .then(image => {
                res.status(201).json(image)
            })
            .catch(next)
    }

    // get single image
    static getImage(req, res, next) {
        const { id } = req.params

        Image.findById(id).populate('tag')
            .then(image => {
                res.status(200).json(image)
            })
            .catch(next)
    }
    
    // delete image from database
    static delete(req, res, next) {
        const { id } = req.params
        
        Image.deleteOne({ _id: id })
            .then(image => {
                res.status(200).json(image)
            })
            .catch(next)
    }

    // favorite an image
    static favImage(req, res, next) {
        const { userId } = req.decode
        const { id } = req.params

        User.updateOne(
            { _id: userId },
            {
                $push: {
                    favorites: id
                }
            }
        )
            .then(user => {
                res.status(201).json(user)
            })
            .catch(next)
    }

    // unfav an image
    static unFavImage(req, res, next) {
        const { userId } = req.decode
        const { id } = req.params

        User.updateOne(
            { _id: userId },
            {
                $pull: {
                    favorites: id
                }
            }
        )
            .then(user => {
                res.status(200).json(user)
            })
            .catch(next)
    }

    // search by tag
    static searchByTag(req, res, next) {
        const { tag } = req.params

        Image.find({ tag: { $regex: tag } })
            .then(images => {
                res.status(200).json(images)
            })
            .catch(next)
    }
}

module.exports = ImageController