import mongoose from 'mongoose';

type userType = {
  image: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  aboutMe: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

const userSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, 'Select an image'],
    },
    name: {
      type: String,
      required: [true, 'Enter your name'],
    },
    email: {
      type: String,
      required: [true, 'Enter your email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Enter your password'],
    },
    aboutMe: {
      type: String,
      required: [true, 'Enter your Description'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// type qwe = InferSchemaType<typeof userSchema>;

export const User = mongoose.model<userType>('User', userSchema);
