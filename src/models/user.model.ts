import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

export const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>('User', UserSchema);

export default User;
