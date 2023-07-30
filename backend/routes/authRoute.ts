import express from 'express';
import {
  deleteController,
  getController,
  getLinkProfileBlogsController,
  getLinkProfileController,
  logController,
  regController,
  updController,
} from '../controller/authController';
import { protect } from '../middleware/authMiddleware';

const authRoute = express.Router();

authRoute.post('/api/reg', regController);
authRoute.post('/api/log', logController);
authRoute.put('/api/upd', updController);
authRoute.delete('/api/delUser', deleteController);
authRoute.get('/api/get', protect, getController);
authRoute.get('/api/get/profile/:id', getLinkProfileController);
authRoute.get('/api/get/profile/:id/blogs', getLinkProfileBlogsController);

export default authRoute;
