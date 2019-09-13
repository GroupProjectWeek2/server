
const Image = require('../models/image')
const User = require('../models/user')

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
        const { title } = req.body
        //const { userId } = req.decode
        console.log(req.file)
        let image = req.file.cloudStoragePublicUrl

        // console.log(req.body.title);
        // console.log(req.body.url);
        // console.log(req.body.tag);
            
        Image.create({ title, url:image})
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
}

module.exports = ImageController