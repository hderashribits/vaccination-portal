import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  standard: { type: String, required: true },
  section: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  dob: { type: Date, required: true },
  address: String,
  phone: String,
  email: { type: String },
  parentName: String,
  parentContact: String,
  vaccinated: { type: Boolean, default: false },
  vaccinationDate: Date
}, { timestamps: true });

// Normalize rollNo before saving (to prevent case mismatch)
studentSchema.pre('save', function (next) {
  if (this.rollNo) {
    this.rollNo = this.rollNo.trim().toUpperCase();
  }
  next();
});

export default mongoose.model('Student', studentSchema);
