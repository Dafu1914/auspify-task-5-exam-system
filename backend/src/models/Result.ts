import mongoose, { Schema, Document } from 'mongoose';

export interface IResult extends Document {
  username: string;
  examTitle: string;
  score: number;
  totalQuestions: number;
  date: Date;
}

const ResultSchema: Schema = new Schema({
  username: { type: String, required: true },
  examTitle: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IResult>('Result', ResultSchema);