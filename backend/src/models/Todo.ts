import mongoose, { Schema } from 'mongoose';
import { ITodo } from '../types';

const TodoSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 25
  },
  description: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ITodo>('Todo', TodoSchema);