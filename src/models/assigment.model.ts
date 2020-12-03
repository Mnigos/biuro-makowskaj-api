import { Schema, model, Document } from 'mongoose';

export interface IAssigment extends Document {
  title: string;
  discription: string;
  image: string;
  createdAt: Date;
}

export const AssigmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  createdAt: {
    type: String,
    default: () => new Date(),
  },
});

const Assigment = model<IAssigment>('Assigment', AssigmentSchema);

export default Assigment;
