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

// POST, PUT/PATCH, GET, DELETE route for Student operations
router.post('/', authenticateAdmin,  createStudent);
router.get('/', authenticateAdmin,  getAllStudents);
router.get('/:rollNo', authenticateAdmin,  getStudentById);
router.put('/:rollNo', authenticateAdmin,  updateStudent);
router.delete('/:rollNo', authenticateAdmin,  deleteStudent);

export default router;
