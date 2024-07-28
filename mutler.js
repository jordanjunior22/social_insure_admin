import multer from 'multer';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

// Multer configuration
const multerConfig = {
  dest: UPLOAD_DIR,
};

const upload = multer(multerConfig);

export default upload;
