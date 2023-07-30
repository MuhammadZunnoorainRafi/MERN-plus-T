export type initialCommentSliceT = {
  comments:
    | {
        _id: string;
        comment: string;
        post: string;
        createdAt: string;
        updatedAt: string;
        user: {
          _id: string;
          image: string;
          name: string;
        };
      }[]
    | [];
};

export type commentType = {
  _id: string;

  comment: string;
  post: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    image: string;
    name: string;
  };
}[];
