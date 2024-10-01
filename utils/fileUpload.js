import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format. Only JPEG, JPG, PNG, and PDF files are allowed.'));
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 },
    fileFilter,
}).fields([
    { name: 'documents[0][file]', maxCount: 1 },
    { name: 'documents[1][file]', maxCount: 1 },
    { name: 'documents[2][file]', maxCount: 1 },
    { name: 'documents[3][file]', maxCount: 1 },
    { name: 'documents[4][file]', maxCount: 1 },
    { name: 'documents[5][file]', maxCount: 1 },
    { name: 'documents[6][file]', maxCount: 1 },
    { name: 'documents[7][file]', maxCount: 1 },
    { name: 'documents[8][file]', maxCount: 1 },
    { name: 'documents[9][file]', maxCount: 1 },
]);
