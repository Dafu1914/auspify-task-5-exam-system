import { Request, Response } from 'express';
import Exam from '../models/Exam';
import Result from '../models/Result';

// Create an exam
export const createExam = async (req: Request, res: Response) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all exams
export const getExams = async (req: Request, res: Response) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ success: true, data: exams });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Submit exam and calculate score
export const submitExam = async (req: Request, res: Response) => {
  try {
    const { username, examId, answers } = req.body; // answers is an array of strings
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ success: false, error: 'Exam not found' });

    let score = 0;
    exam.questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        score++;
      }
    });

    const result = await Result.create({
      username,
      examTitle: exam.title,
      score,
      totalQuestions: exam.questions.length,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get results for a user
export const getResults = async (req: Request, res: Response) => {
  try {
    const results = await Result.find({ username: req.params.username });
    res.status(200).json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};