import express from 'express';
import upload from '../utils/csvUpload.js';
import { handleCSVUpload } from '../controllers/csvUploadController.js'; // Correct import
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST, PUT/PATCH, GET, DELETE route for CSV upload operations
router.post('/csv-upload', authenticateAdmin, upload.single('file'), handleCSVUpload);
router.put('/csv-upload', authenticateAdmin, upload.single('file'), handleCSVUpload);
router.patch('/csv-upload', authenticateAdmin, upload.single('file'), handleCSVUpload);
router.get('/csv-upload', authenticateAdmin, upload.single('file'), handleCSVUpload);
router.delete('/csv-upload', authenticateAdmin, upload.single('file'), handleCSVUpload);

export default router;
