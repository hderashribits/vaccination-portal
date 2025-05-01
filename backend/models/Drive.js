// models/Drive.js
import mongoose from 'mongoose';

const driveSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  availableDoses: {
    type: Number,
    required: true,
    min: 0,
  },
  applicableClasses: {
    type: [String], // e.g., ["Grade 5", "Grade 6"]
    required: true,
  },
  expired: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('Drive', driveSchema);
