import mongoose from 'mongoose';

// Schema for the Student model
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
  vaccineName: {
    type: String,
    required: [function () { return this.vaccinated === true }, 'Vaccine name is required when vaccinated is true'],
  },
  vaccinationDate: {
    type: Date,
    required: [function () { return this.vaccinated === true }, 'Vaccination date is required when vaccinated is true'],
  }
}, { timestamps: true });

// rollNo normalization
studentSchema.pre('save', function (next) {
  if (this.rollNo) {
    this.rollNo = this.rollNo.trim().toUpperCase();
  }
  next();
});

export default mongoose.model('Student', studentSchema);
