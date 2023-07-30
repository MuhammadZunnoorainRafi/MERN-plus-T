import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../model/user';
import bcrypt from 'bcryptjs';
import { genToken } from '../utiles/genToken';
import { RequestWithUser } from '../middleware/authMiddleware';
import { Post } from '../model/post';
import { Comment } from '../model/comments';

// @desc Register
// @route /api/reg
// @access Public
export const regController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { aboutMe, image, name, email, password } = req.body;
    if (!aboutMe || !image || !name || !email || !password) {
      res.status(401);
      throw new Error('Fill all the fields');
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      image,
      name,
      email,
      password: hashPassword,
      aboutMe,
    });
    if (newUser) {
      res.status(201);
      res.json({
        _id: newUser._id,
        image: newUser.image,
        name: newUser.name,
        email: newUser.email,
        aboutMe: newUser.aboutMe,
        isAdmin: newUser.isAdmin,
        createdAt: newUser.createdAt.toString(),
        updatedAt: newUser.updatedAt.toString(),
        token: genToken(newUser._id),
      });
    } else {
      res.status(401);
      throw new Error('user not created');
    }
  }
);

// @desc Login
// @route /api/reg
// @access Public
export const logController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);

      throw new Error('Fill all the fields');
    }
    const userExist = await User.findOne({ email });
    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      res.status(202);
      res.json({
        _id: userExist._id,
        image: userExist.image,
        name: userExist.name,
        email: userExist.email,
        aboutMe: userExist.aboutMe,
        isAdmin: userExist.isAdmin,
        createdAt: userExist.createdAt.toString(),
        updatedAt: userExist.updatedAt.toString(),
        token: genToken(userExist._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid Credentials');
    }
  }
);
// @desc Update User
// @route /api/upd
// @access Public
export const updController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { aboutMe, image, id, name, email, password } = req.body;
    if (!image || !name || !email || !password) {
      res.status(401);
      throw new Error('Fill all the fields');
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.findByIdAndUpdate(
      id,
      {
        image,
        name,
        email,
        aboutMe,
        password: hashPassword,
      },
      {
        new: true,
      }
    );
    if (newUser) {
      res.status(201);
      res.json({
        _id: newUser._id,
        image: newUser.image,
        name: newUser.name,
        email: newUser.email,
        aboutMe: newUser.aboutMe,
        isAdmin: newUser.isAdmin,
        createdAt: newUser.createdAt.toString(),
        updatedAt: newUser.updatedAt.toString(),
        token: genToken(newUser._id),
      });
    } else {
      res.status(401);
      throw new Error('user not created');
    }
  }
);

// @desc Delete
// @route /api/delUser
// @access Private
export const deleteController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const deletedUser = await User.findByIdAndDelete(id);
    await Post.deleteMany({ user: id });
    await Comment.deleteMany({ user: id });
    res.json(deletedUser);
  }
);

// @desc Get
// @route /api/get
// @access Private
export const getController = expressAsyncHandler(
  async (req: RequestWithUser, res: Response) => {
    res.status(200).json({
      _id: req.user?._id,
      name: req.user?.name,
      email: req.user?.email,
      image: req.user?.image,
      aboutMe: req.user?.aboutMe,
      createdAt: req.user?.createdAt.toString(),
      updatedAt: req.user?.updatedAt.toString(),
    });
  }
);

// @desc Get
// @route /api/get/profile/:id
// @access Public
export const getLinkProfileController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const LinkProfile = await User.findById(req.params.id);
    if (LinkProfile) {
      res.status(200).json(LinkProfile);
    } else {
      res.status(404);
      throw new Error('User not Found');
    }
  }
);

// @desc Get
// @route /api/get/profile/:id/blogs
// @access Public

export const getLinkProfileBlogsController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const linkProfileBlogs = await Post.find({ user: req.params.id }).populate(
      'user'
    );
    if (linkProfileBlogs) {
      res.status(200).json(linkProfileBlogs);
    } else {
      res.status(404);
      throw new Error('Tickets not Found');
    }
  }
);
