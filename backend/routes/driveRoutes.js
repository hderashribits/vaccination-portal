import express from 'express';
import {
  createDrive,
  getAllDrives,
  updateDrive,
} from '../controllers/driveController.js';

const router = express.Router();

router.post('/', createDrive);
router.get('/', getAllDrives);
router.put('/:id', updateDrive);

export default router;
