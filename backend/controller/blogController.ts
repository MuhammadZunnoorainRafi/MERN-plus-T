import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { Post } from '../model/post';
import { RequestWithUser } from '../middleware/authMiddleware';
import { Comment } from '../model/comments';

// Create blog post
export const createBlogPost = expressAsyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { image, title, description, category, summary } = req.body;
    if (!image || !title || !description || !category || !summary) {
      res.status(401).json({
        message: 'Please fill all the fields',
      });
    }

    const blogPost = await Post.create({
      user: req.user?._id,
      image,
      title,
      description,
      category,
      summary,
    });
    if (blogPost) {
      const blogPostWithId = {
        _id: blogPost._id,
        user: blogPost.user,
        title: blogPost.title,
        description: blogPost.description,
        category: blogPost.category,
        image: blogPost.image,
        summary: blogPost.summary,
        createdAt: blogPost.createdAt.toString(),
        updatedAt: blogPost.updatedAt.toString(),
      };
      res.status(201).json(blogPostWithId);
    } else {
      res.status(401);
      throw new Error('Post not created');
    }
  }
);

// Get All blogs post

export const getAllBlogPosts = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const getPosts = await Post.find().populate('user').exec();
    res.status(200).json(getPosts);
  }
);

// Get single blogs post
export const getSingleBlogPost = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const singlePost = await Post.findOne({ _id: req.params.id }).populate(
      'user'
    );
    if (singlePost) {
      res.status(200).json(singlePost);
    } else {
      res.status(404);
      throw new Error('Post not Found');
    }
  }
);
// Delete single blogs post
export const deleteSingleBlogPost = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const deleteSinglePost = await Post.findByIdAndDelete(id);
    await Comment.deleteMany({ post: id });
    if (deleteSinglePost) {
      res.status(200).json({
        message: 'Deleted',
      });
    } else {
      res.status(404);
      throw new Error('Post not Found');
    }
  }
);

// Update blog post

export const updateBlogPost = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id, image, title, description, category, summary } = req.body;
    if (!id || !image || !title || !description || !category || !summary) {
      res.status(401).json({
        message: 'Please fill all the fields',
      });
    }
    await Post.findByIdAndUpdate(
      id,
      { image, title, description, category, summary },
      { new: true }
    );
    res.status(202).json({ updated: true });
  }
);
