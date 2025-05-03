import express from 'express';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} from '../controllers/studentController.js';

const router = express.Router();

// CREATE
router.post('/', authenticateAdmin,  createStudent);

// READ ALL
router.get('/', authenticateAdmin,  getAllStudents);

// READ ONE
router.get('/:rollNo', authenticateAdmin,  getStudentById);

// UPDATE
router.put('/:rollNo', authenticateAdmin,  updateStudent);

// DELETE
router.delete('/:rollNo', authenticateAdmin,  deleteStudent);

export default router;
