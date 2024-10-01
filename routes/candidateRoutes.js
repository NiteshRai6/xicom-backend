import express from 'express';
import createCandidate from '../controllers/candidateController.js'
import { validateCandidate } from '../validators/candidateValidator.js';
import { upload } from '../utils/fileUpload.js';

const router = express.Router();

router.post(
    '/candidates',
    upload,
    validateCandidate,
    createCandidate
);

export default router;
