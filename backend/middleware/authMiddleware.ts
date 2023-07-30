/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable prefer-const */
// /* eslint-disable prefer-const */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import expressAsyncHandler from 'express-async-handler';
import { Types } from 'mongoose';
import { User } from '../model/user';

type UserType = {
  _id: Types.ObjectId;
  image: string;
  name: string;
  email: string;
  aboutMe: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export interface RequestWithUser extends Request {
  user?: UserType;
}

interface DecodedToken {
  id: string;
}

export const protect = expressAsyncHandler(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    let token;
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {
      try {
        token = authorization.split(' ')[1];
        const decode = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as DecodedToken;
        req.user = (await User.findById(decode.id).select(
          '-password'
        )) as UserType;

        next();
      } catch (error) {
        res.status(401); // Change the status code to 401 for unauthorized access
        throw new Error('Not Authorized');
      }
    }

    if (!token) {
      res.status(401); // Change the status code to 401 for unauthorized access
      throw new Error('Token not found');
    }
  }
);
