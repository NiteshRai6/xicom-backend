import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}
