import { Schema, model, Document } from 'mongoose';

export interface IAssigment extends Document {
  title: string;
  discription: string;
  image: string;
}

export const AssigmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
});

const Assigment = model<IAssigment>('Assigment', AssigmentSchema);

export default Assigment;
