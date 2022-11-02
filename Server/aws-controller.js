'use strict';

const aws = require('aws-sdk');
var secrets = require('./secrets');

const s3 = new aws.S3({
    signatureVersion: 'v4',
    region: 'us-east-2'
});


// Gives signed request to upload a file to s3 from ionic app
exports.signedRequest = function(req, res) {
    // Params of queried object
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: secrets.aws_bucket,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'private'
    }

    // Get signed URL for request
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        const returnData = {
            signedRequest: data,
            url: `https://${secrets.aws_bucket}.s3.amazonaws.com/${fileName}`
        }
        return res.json(returnData);
    });
};

// Give signed request to access the resource on s3
exports.getFileSignedRequest = function(req, res) {
    const s3Params = {
        Bucket: secrets.aws_bucket,
        Key: req.params.fileName,
        Expires: 60
    }

    s3.getSignedUrl('getObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        return res.json(data);
    });
};

// List all files of the backend
exports.listFiles = function(req, res) {
    // Give only top level of bucket
    const s3Params = {
        Bucket: secrets.aws_bucket,
        Delimiter: '/'
    }

    s3.listObjects(s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        return res.json(data);
    });
};

// Delete a file
exports.deleteFile = function(req, res) {
    const s3Params = {
        Bucket: secrets.aws_bucket,
        Key: req.params.fileName
    }

    s3.deleteObject(s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }

        // Status 200 is typically known for a successful action
        return res.status(200).send({'msg': 'file deleted'});
    });
};