import { model, Schema } from 'mongoose';
import { UserTypeValues } from '../types';
import { User } from '../interfaces';


const userSchema = new Schema<User>({
  idx: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userType: { type: String, enum: UserTypeValues, required: true },
}, { timestamps: true });

const UserModel = model<User>('User', userSchema);

export { userSchema, UserModel };