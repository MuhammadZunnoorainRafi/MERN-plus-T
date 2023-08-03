import express, { Request, Response, urlencoded } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import 'colors';
import { connectDB } from '../config/db';
import authRoute from '../routes/authRoute';
import { errorMiddleware } from '../middleware/errorMiddleware';
import blogRoute from '../routes/blogRoute';

dotenv.config();

// Connect to DataBase
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Policy
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

// declare module 'express-serve-static-core' {
//   interface Request {
//     user: {
//       _id: Types.ObjectId;
//       name: string;
//       email: string;
//     };
//   }
// }

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/', authRoute);
app.use('/', blogRoute);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req: Request, res: Response) =>
    res.sendFile(path.resolve(__dirname, '/frontend/dist/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(errorMiddleware);
app.listen(PORT, () =>
  console.log(`Server is running on PORT: http://localhost:${PORT}`)
);

// test
