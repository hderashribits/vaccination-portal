import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  standard: { type: String, required: true },
  section: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date, required: true },
  address: String,
  phone: String,
  email: { type: String, unique: true },
  parentName: String,
  parentContact: String,
  vaccinated: { type: Boolean, default: false },
  vaccinationDate: Date
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);