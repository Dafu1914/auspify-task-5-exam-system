import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface User {
  username: string;
}

export interface Exam {
  _id?: string;
  title: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface Result {
  _id?: string;
  username: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
}

// AUTH
export const login = async (username: string, password: string): Promise<User> => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, password });
  return res.data.data;
};

export const register = async (username: string, password: string): Promise<User> => {
  const res = await axios.post(`${API_URL}/auth/register`, { username, password });
  return res.data.data;
};

// EXAMS
export const getExams = async (): Promise<Exam[]> => {
  const res = await axios.get(`${API_URL}/exams`);
  return res.data.data;
};

export const createExam = async (exam: Exam): Promise<Exam> => {
  const res = await axios.post(`${API_URL}/exams`, exam);
  return res.data.data;
};

export const submitExam = async (username: string, examId: string, answers: string[]): Promise<Result> => {
  const res = await axios.post(`${API_URL}/exams/submit`, { username, examId, answers });
  return res.data.data;
};

export const getResults = async (username: string): Promise<Result[]> => {
  const res = await axios.get(`${API_URL}/exams/results/${username}`);
  return res.data.data;
};