import express from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';
import { authenticateAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateAdmin, getDashboardStats);

export default router;
