// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

function getLabel(req,res,next) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './keyfile.json'
    });

    const file = req.file.buffer
    console.log(file)
  
    client.labelDetection(file)
    .then(results => {
    const labels = results[0].labelAnnotations;
    req.labels = labels
    console.log(req.labels)
    next()
    // if(labels){
    //     req.labels = labels
    //     console.log(req.labels)
    //     next()
    // }else{
    //     next({httpStatus: 400, message: 'You need to upload photo'})
    // }
}).catch(next)

  }

  module.exports = getLabel




