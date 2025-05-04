import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import driveRoutes from './routes/driveRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import authRoutes from './routes/authRoutes.js';
import csvUploadRoutes from './routes/csvUploadRoutes.js';

dotenv.config();

// Database Connection Function
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/vaccination_portal';
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/drives', driveRoutes);
app.use('/api', csvUploadRoutes);
app.use('/api/students', studentRoutes);

// Health check route
app.get('/health', async (req, res) => {
  try {
    const result = await mongoose.connection.db.command({ ping: 1 });
    res.status(200).json({ message: 'Database is up and running!', result });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error: error.message });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
