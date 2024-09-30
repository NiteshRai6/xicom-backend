import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import candidateRoutes from './routes/candidateRoutes.js';
import errorHandler from './middlewares/errorHandler.js';


dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/api', candidateRoutes);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
