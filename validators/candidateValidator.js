import { body } from 'express-validator';
import validateInputs from '../middlewares/validateMiddleware.js';

export const validateCandidate = [
    body('firstName').notEmpty().withMessage('First Name is required'),
    body('lastName').notEmpty().withMessage('Last Name is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('dateOfBirth').isDate().withMessage('Invalid date').custom(value => {
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 18) {
            throw new Error('Age must be at least 18');
        }
        return true;
    }),
    // body('documents').isArray({ min: 2 }).withMessage('At least 2 documents are required'),
    validateInputs,
];
