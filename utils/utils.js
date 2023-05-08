//s3 multer
const multer = require("multer");
const aws = require("aws-sdk");
var multerS3 = require("multer-s3-v2");
const path = require("path");

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.DEFAULT_REGION,
});

const s3 = new aws.S3();

let bucketName = 'property16777';

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

//delete file from s3 by link
async function deleteFile(link) {
  console.log(link);
  const params = {
    Bucket: bucketName,
    Key: link,
  };
  await s3.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

module.exports = { upload, deleteFile };

//end s3 multer
//end of file
