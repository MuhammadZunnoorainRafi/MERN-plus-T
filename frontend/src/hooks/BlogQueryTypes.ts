export type blogDataT = {
  id?: string;
  image: string;
  title: string;
  summary: string;
  description: string;
  category: [
    'technology',
    'politics',
    'sports',
    'health',
    'travel',
    'business',
    'Select Category'
  ];
};

export type BlogSingleType = {
  _id: string;
  title: string;
  description: string;
  category: [
    'technology',
    'politics',
    'sports',
    'health',
    'travel',
    'business',
    'Select Category'
  ];
  image: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    image: string;
    name: string;
  };
  postLikes: {
    _id: string;
    user: string;
    post: string;
  }[];
};
