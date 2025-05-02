import express from 'express';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

import {
  createDrive,
  getAllDrives,
  updateDrive,
  deleteDrive,
} from '../controllers/driveController.js';

const router = express.Router();

router.post('/', createDrive);
router.get('/', getAllDrives);
router.put('/:id', updateDrive);
router.delete('/', authenticateAdmin, deleteDrive);

export default router;
