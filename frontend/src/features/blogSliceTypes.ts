export type initialStateType = {
  blogs:
    | {
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
      }[]
    | [];
  blog: {
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
  } | null;
};

export type getBlogsType = {
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
