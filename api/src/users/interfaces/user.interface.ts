import { Document } from 'mongoose';

export interface User extends Document {
  id: string;
  data: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  roles: string[];
}
