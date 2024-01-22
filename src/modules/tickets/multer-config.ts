import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

import * as crypto from 'crypto';

const s3Config = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const generateCryptoCode = () => {
  return crypto.randomBytes(16).toString('hex');
};

const multerConfig = {
  storage: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const cryptoCode = generateCryptoCode();
      const fileName = `${cryptoCode}`;
      cb(null, fileName);
    },
  }),
};

export default multerConfig;
