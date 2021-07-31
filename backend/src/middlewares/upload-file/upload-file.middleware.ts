import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

const uploadFile = upload.single('file');

export { uploadFile };
