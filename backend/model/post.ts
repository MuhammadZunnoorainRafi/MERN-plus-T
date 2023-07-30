import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      required: [true, 'upload Image'],
    },
    title: {
      type: String,
      required: [true, 'Enter Title'],
    },
    summary: {
      type: String,
      required: [true, 'Enter Summary'],
    },
    description: {
      type: String,
      required: [true, 'Enter Description'],
    },
    category: {
      type: String,
      enum: [
        'technology',
        'politics',
        'sports',
        'health',
        'travel',
        'business',
      ],
      required: [true, 'Select Category'],
    },
    postLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostLikes',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model('Post', blogSchema);
