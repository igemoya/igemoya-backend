import {
  createSchema, ExtractDoc, Type, typedModel,
} from 'ts-mongoose';
import { ObjectId } from 'mongodb';
import { UserType, UserTypeValues } from '../types';


const userSchema = createSchema({
  idx: Type.number({ required: true, unique: true }),
  username: Type.string({ required: true, unique: true }),
  name: Type.string({ required: true }),
  userType: Type.string({ enum: UserTypeValues }),
}, { timestamps: true });

export type UserDoc = ExtractDoc<typeof userSchema>;

const UserModel = typedModel('User', userSchema, undefined, undefined, {
  findByIdx(idx: number) {
    return this.findOne({ idx });
  },
  findById(id: ObjectId) {
    return this.findOne({ _id: id });
  },
  findByUserType(userType: UserType[]) {
    return this.find({ userType: { $in: userType }})
  },
});

export { userSchema, UserModel };