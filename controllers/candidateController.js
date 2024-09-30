import Candidate from '../models/candidateModel.js';

export default async function createCandidate(req, res) {
    try {
        const { firstName, lastName, email, dateOfBirth, residentialAddress, permanentAddress, isSameAsResidential } = req.body;

        const documents = req.files.map(file => ({
            fileName: file.originalname,
            fileType: file.mimetype.includes('pdf') ? 'pdf' : 'image',
            filePath: file.path,
        }));

        if (isSameAsResidential) {
            permanentAddress.street1 = residentialAddress.street1;
            permanentAddress.street2 = residentialAddress.street2;
        }

        const candidate = new Candidate({
            firstName,
            lastName,
            email,
            dateOfBirth,
            residentialAddress,
            permanentAddress: isSameAsResidential ? null : permanentAddress,
            isSameAsResidential,
            documents,
        });

        await candidate.save();
        res.status(201).json(
            { message: 'Candidate created successfully', candidate });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
