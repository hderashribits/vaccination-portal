import mongoose from 'mongoose';

// Schema for the Drive model
const driveSchema = new mongoose.Schema({
  vaccineName: { type: String, required: true },
  date: { type: Date, required: true },
  availableDoses: { type: Number, required: true },
  applicableClasses: {
    type: [String],
    required: true,
    validate: {
      validator: function (val) {
        return Array.isArray(val) && val.length > 0;
      },
      message: 'At least one applicable class is required',
    },
  },
}, { timestamps: true });

export default mongoose.model('Drive', driveSchema);
