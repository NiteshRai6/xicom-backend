import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, enum: ['image', 'pdf'], required: true },
    filePath: { type: String, required: true },
});

const CandidateSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    residentialAddress: {
        street1: { type: String, required: true },
        street2: { type: String, required: true },
    },
    permanentAddress: {
        street1: { type: String },
        street2: { type: String },
    },
    isSameAsResidential: { type: Boolean, default: false },
    documents: { type: [DocumentSchema], validate: v => v.length >= 2 },
},
    { timestamps: true }
);

const Candidate = mongoose.model('Candidate', CandidateSchema);
export default Candidate;
