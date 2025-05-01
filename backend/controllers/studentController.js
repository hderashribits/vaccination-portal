import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error('Error creating student:', err.message);
    res.status(500).json({ error: 'Server error ' + err.message });
  }
};
