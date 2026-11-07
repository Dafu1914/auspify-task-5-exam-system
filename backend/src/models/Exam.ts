import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
  title: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[];
}

const ExamSchema: Schema = new Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IExam>('Exam', ExamSchema);