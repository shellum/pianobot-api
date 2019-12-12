let response;
const aws = require('aws-sdk')
aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
  });
var bucket = process.env.BUCKET_NAME
var s3 = new aws.S3();

exports.load = async (event, context) => {
    const promise = new Promise(function(resolve, reject) {
        console.log(JSON.stringify(event))
        var user = event.pathParameters.user

        var params = {
            Bucket: bucket,
            Key : user
          };

        s3.getObject(params, function(err, data) {
            if (err) { 
                console.log(err, err.stack);
                reject({
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: err
                    })
                })
            }
            else {
                var body = data.Body.toString('utf-8');
                console.log(body);
                resolve({
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: body
                    })
                })
            }
        })
    })
    return promise
}

exports.save = async (event, context) => {
    const promise = new Promise(function(resolve, reject) {
        var user = event.pathParameters.user
        var body = event.body
        var params = {
            Bucket: bucket,
            Body : body,
            Key : user
          };
        s3.upload(params, function (err, data) {
            if (err) {
            console.log("Error", err);
                reject({
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: err
                    })
                })
            }
        
            if (data) {
                resolve({
                    'statusCode': 200,
                    'body': JSON.stringify({
                        message: data,
                        event: event,
                        context: context
                    })
                })
            }
        });
    })

    return promise;
};
