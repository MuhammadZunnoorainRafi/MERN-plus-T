import { Types } from 'mongoose';

export type decodeWithId = {
  id: string;
};

export type user = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  isAdmin: boolean;
};
