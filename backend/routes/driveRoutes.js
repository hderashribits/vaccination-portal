import express from 'express';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

import {
  createDrive,
  getAllDrives,
  updateDrive,
  deleteDrive,
  getAllVaccineNames, 
} from '../controllers/driveController.js';

const router = express.Router();

// POST, PUT/PATCH, GET, DELETE route for Drive operations
router.post('/', authenticateAdmin, createDrive);
router.get('/', authenticateAdmin, getAllDrives);
router.put('/:id', authenticateAdmin, updateDrive);
router.delete('/', authenticateAdmin, deleteDrive);
router.get('/vaccinationNames', authenticateAdmin, getAllVaccineNames);

export default router;
