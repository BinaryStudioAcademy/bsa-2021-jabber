import multer from 'multer';
import { UPLOAD_FILE_KEY } from '~/common/constants/constants';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

const uploadFile = upload.single(UPLOAD_FILE_KEY);

export { uploadFile };
