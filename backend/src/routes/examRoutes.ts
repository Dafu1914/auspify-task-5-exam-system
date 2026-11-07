import express from 'express';
import { createExam, getExams, submitExam, getResults } from '../controllers/examController';

const router = express.Router();

router.route('/').get(getExams).post(createExam);
router.post('/submit', submitExam);
router.get('/results/:username', getResults);

export default router;