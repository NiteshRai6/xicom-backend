import express from 'express';
import createCandidate from '../controllers/candidateController.js'
import { validateCandidate } from '../validators/candidateValidator.js';

const router = express.Router();

router.post('/candidates', validateCandidate, createCandidate);

export default router;
