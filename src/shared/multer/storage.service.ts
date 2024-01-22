import { Injectable } from '@nestjs/common';

import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import crypto from 'crypto';
import { S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import * as multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService implements MulterOptionsFactory {
  constructor() {
    console.log('StorageService is being instantiated');
    // Outros códigos de inicialização, se houver
  }

  private readonly config = {
    region: process.env.AWS_REGION,
    credentials: fromIni({
      profile: process.env.AWS_PROFILE,
    }),
  };

  private readonly storageTypes = {
    local: diskStorage({
      destination: path.resolve(__dirname, '..', '..', '..', '..', 'tmp'),

      filename: (req, file, cb) => {
        const fileName =
          path.parse(file.filename).name.replace(/\s/g, '') + '-' + uuidv4();

        const extension = path.parse(file.filename).ext;
        cb(null, `${fileName}${extension}`);
      },
    }),

    s3: multerS3({
      s3: new S3Client(this.config),
      bucket: (req, file, cb) => {
        cb(null, process.env.AWS_BUCKET);
      },
      acl: 'public-read',
      key: (req, file, cb) => {
        this.getS3Filename(req, file, (err, key) => {
          if (err) {
            return cb(err);
          }
          cb(null, key);
        });
      },
    }),
  };

  private getLocalFilename(req, file, cb) {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, '');
      const fileName = `${hash.toString('hex')}-${file.originalname}`;
      cb(null, fileName);
    });
  }

  private getS3Filename(req, file, cb) {
    crypto.randomBytes(12, (err, hash) => {
      if (err) cb(err, '');
      const fileName = `${hash.toString('hex')}-${file.originalname}`;
      cb(null, fileName);
    });
  }

  createMulterOptions(): MulterModuleOptions {
    console.log('Creating Multer options...');
    console.log(path.resolve(__dirname, '..', '..', '..', '..', 'tmp'));
    const storageType = process.env.STORAGE_TYPE || 'local';
    if (storageType === 's3') {
      return {
        storage: this.storageTypes.s3,
      };
    } else {
      return {
        dest: path.resolve(__dirname, '..', '..', '..', '..', 'tmp'),
        storage: this.storageTypes.local,
      };
    }
  }
}
