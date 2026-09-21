import express from 'express';
import { getTasks } from '../controllers/taskController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.get('/', protect, getTasks);

export default router;