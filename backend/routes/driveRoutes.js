import express from 'express';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

import {
  createDrive,
  getAllDrives,
  updateDrive,
  deleteDrive,
} from '../controllers/driveController.js';

const router = express.Router();

router.post('/', authenticateAdmin, createDrive);
router.get('/', authenticateAdmin, getAllDrives);
router.put('/:id', authenticateAdmin, updateDrive);
router.delete('/', authenticateAdmin, deleteDrive);

export default router;
