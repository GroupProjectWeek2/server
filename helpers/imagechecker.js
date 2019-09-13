// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

function imagechecker(req,res,next) {
    let bad_content = false
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFilename: './keyfile.json'
    });
    
    const file = req.file.buffer
    // console.log(file)
  
    // Performs label detection on the image file
    // const [result] = await client.labelDetection('./try2.png');
    // const labels = result.labelAnnotations;
    // console.log('Labels:');
    // //console.log(result)
    // labels.forEach(label => console.log(label.description));
    client.safeSearchDetection(file)
    .then(results=>{
        //console.log("masuk then")
        //console.log(results.safeSearchAnnotation)
        const detections = results[0].safeSearchAnnotation;
        const parameter = ['adult','medical','spoof','violence','racy']
        // console.log('Safe search:');
        // console.log(`Adult: ${detections.adult}`);
        // console.log(`Medical: ${detections.medical}`);
        // console.log(`Spoof: ${detections.spoof}`);
        // console.log(`Violence: ${detections.violence}`);
        // console.log(`Racy: ${detections.racy}`);
        for(let i =0; i < parameter.length; i++){
            //console.log(`${parameter[i]} : ${detections[parameter[i]]}`)
            if(detections[parameter[i]] == "POSSIBLE" || detections[parameter[i]] == "LIKELY" || detections[parameter[i]]== "VERY_LIKELY"){
                bad_content = true
            }
        }
        if(bad_content){
            next({httpStatus: 400, message: 'Sorry your content probably unapropriate content'})
        } else{
            next()
        }
    }).catch(next)
  }

  module.exports = imagechecker

  //imagechecker()
  //quickstart()



