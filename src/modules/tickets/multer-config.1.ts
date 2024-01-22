import { diskStorage } from 'multer';
import * as path from 'path';

const multerConfig = {
  storage: diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
      const fileName = path.parse(file.originalname).name.replace(/\s/g, '');
      cb(null, `${fileName}`);
    },
  }),
};

export default multerConfig;
