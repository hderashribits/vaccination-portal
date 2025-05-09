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
// READ ALL with optional filters
export const getAllStudents = async (req, res) => {
  try {
    const { vaccineName, vaccinated, startDate, endDate } = req.query;

    const query = {};

    // Filter by vaccineName (case-insensitive)
    if (vaccineName) {
      query.vaccineName = new RegExp(`^${vaccineName}$`, 'i');
    }

    // Filter by vaccinated status (string 'true'/'false' from query)
    if (vaccinated !== undefined) {
      query.vaccinated = vaccinated === 'true';
    }

    // Filter by vaccination date range
    if (startDate || endDate) {
      query.vaccinationDate = {};
      if (startDate) query.vaccinationDate.$gte = new Date(startDate);
      if (endDate) query.vaccinationDate.$lte = new Date(endDate);
    }

    const students = await Student.find(query);
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
      { rollNo: req.params.rollNo },   
      req.body,                        
      { new: true, runValidators: true } 
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
