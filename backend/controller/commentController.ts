import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { RequestWithUser } from '../middleware/authMiddleware';
import { Comment } from '../model/comments';

export const getCommentsController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const blogComments = await Comment.find({
      post: req.params.blogId,
    }).populate('user');
    if (blogComments) {
      res.status(200).json(blogComments);
    } else {
      res.status(404);
      throw new Error('Comments not found');
    }
  }
);

export const createCommentController = expressAsyncHandler(
  async (req: RequestWithUser, res: Response) => {
    const { comment } = req.body;
    const createdBlogComment = await Comment.create({
      user: req.user?._id,
      post: req.params.blogId,
      comment,
    });
    if (createdBlogComment) {
      res.status(201).json({
        message: 'Created Comment',
      });
    } else {
      res.status(401);
      throw new Error('Comment not created');
    }
  }
);

export const updateCommentController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { comment, cmntId } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      cmntId,
      { comment: comment },
      { new: true }
    );
    if (updatedComment) {
      res.status(201).json({
        message: 'Updated',
      });
    } else {
      res.status(401);
      throw new Error('Not Updated Error');
    }
  }
);

export const deleteCommentController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const delCmnt = await Comment.findByIdAndDelete(id);
    if (delCmnt) {
      res.status(200).json({
        deleted: true,
      });
    } else {
      res.status(400).json({
        deleted: false,
      });
    }
  }
);
