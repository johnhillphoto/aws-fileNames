'use strict';
var keys = require('./keys.js').keys;
var AWS = require('aws-sdk');
var uuid = require('node-uuid');

// Create an S3 client
var s3 = new AWS.S3();
s3.config.update({accessKeyId: keys.AWS_ACCESS_KEY_ID, secretAccessKey: keys.AWS_SECRET_ACCESS_KEY});

// Create a bucket and upload something into it
// var uuid = require('node-uuid');
// var bucketName = 'node-sdk-sample-' + uuid.v4();
// var keyName = 'hello_world.txt';

// s3.createBucket({Bucket: bucketName}, function() {
//   var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//   s3.putObject(params, function(err, data) {
//     if (err)
//       console.log(err)
//     else
//       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//   });
// });
const params = {
    Bucket: 'ppi-images',
    Prefix: 'portfolio'
}
const urlPrefix = `https://s3.amazonaws.com/${params.Bucket}/${params.Prefix}/`;

s3.listObjectsV2(params, function (err, data) {
 if(err)throw err;
 let fileNames = [];
 const prefix = `${params.Prefix}/`;
//  console.log(prefix);
 data.Contents.forEach(image => {
     if(image.Key !== prefix){
         let fileObject = {};
         fileObject.name = image.Key.slice(prefix.length);
         fileObject.URL = `${urlPrefix}${fileObject.name}`;
         fileNames.push(fileObject);
     }
 })
 console.log(fileNames);
});

// babel-node awsGetFiles.js