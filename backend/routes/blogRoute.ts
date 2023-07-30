import express from 'express';
import {
  createBlogPost,
  deleteSingleBlogPost,
  getAllBlogPosts,
  getSingleBlogPost,
  updateBlogPost,
} from '../controller/blogController';
import { protect } from '../middleware/authMiddleware';
import commentRoute from './commentRoute';

const blogRoute = express.Router();
blogRoute.use('/api/blog/:blogId/comments', commentRoute);
blogRoute.get('/api/blog', getAllBlogPosts);
blogRoute.get('/api/blog/:id', getSingleBlogPost);
blogRoute.delete('/api/blog/delete', protect, deleteSingleBlogPost);
blogRoute.route('/api/blog').post(protect, createBlogPost);
blogRoute.put('/api/blog/update', protect, updateBlogPost);

export default blogRoute;
