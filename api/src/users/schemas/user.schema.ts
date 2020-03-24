import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  data: { type: Date, default: Date.now },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  roles: Array<String>(),
});

export const UserModel = { name: 'User', schema: UserSchema };
