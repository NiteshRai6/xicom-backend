import Candidate from '../models/candidateModel.js';

export default async function createCandidate(req, res) {
    try {
        const { firstName, lastName, email, dateOfBirth, residentialAddress, permanentAddress, isSameAsResidential } = req.body;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: 'No documents were uploaded.' });
        }

        const documents = [];

        Object.keys(req.files).forEach((key) => {
            const file = req.files[key][0];

            const fileType = file.mimetype.startsWith('image') ? 'image' : 'pdf';

            documents.push({
                fileName: file.originalname,
                fileType: fileType,
                filePath: file.path,
                size: file.size,
            });
        });

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

        res.status(201).json({ message: 'Candidate created successfully', candidate });
    } catch (err) {
        console.error('Error creating candidate:', err);
        res.status(500).json({ error: err.message });
    }
}
