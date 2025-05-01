import Student from '../models/Student.js';

// CREATE
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error('Error creating student:', err.message);
    res.status(400).json({ error: 'Server error: ' + err.message });
  }
};

// READ ALL
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.error('Error fetching students:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// READ ONE
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error fetching student:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// UPDATE
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },   // filter
      req.body,                        // update fields
      { new: true, runValidators: true } // options
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    console.error('Error updating student:', err.message);
    res.status(400).json({ error: 'Server error: ' + err.message });
  }
};

// DELETE
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.deleteOne({ rollNo: req.params.rollNo });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(204);
  } catch (err) {
    console.error('Error deleting student:', err.message);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
