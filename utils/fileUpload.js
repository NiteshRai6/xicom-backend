import multer, { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
    const fileType = /jpeg|jpg|png|pdf/;
    const extName = fileType.test(extname(file.originalname).toLowerCase());
    const mimeType = fileType.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    }
    cb('Error: File type not supported');
};

export default multer({ storage, fileFilter });
