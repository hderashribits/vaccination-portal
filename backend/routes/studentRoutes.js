import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';

const router = express.Router();

// CREATE
router.post('/', createStudent);

// READ ALL
router.get('/', getAllStudents);

// READ ONE
router.get('/:rollNo', getStudentById);

// UPDATE
router.put('/:rollNo', updateStudent);

// DELETE
router.delete('/:rollNo', deleteStudent);

export default router;
