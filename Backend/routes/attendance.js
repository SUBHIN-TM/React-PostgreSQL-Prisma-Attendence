import express from 'express';
import { markAttendance, getAttendance } from '../controllers/attendance.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/mark', verifyToken, markAttendance);
router.get('/', verifyToken, getAttendance);

export default router;
