import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
  createCommentController,
  deleteCommentController,
  getCommentsController,
  updateCommentController,
} from '../controller/commentController';
const commentRoute = express.Router({ mergeParams: true });

commentRoute
  .route('/')
  .get(getCommentsController)
  .post(protect, createCommentController)
  .put(protect, updateCommentController)
  .delete(protect, deleteCommentController);

export default commentRoute;
