/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error:${error}`.red.bold);
    process.exit(1);
  }
};
