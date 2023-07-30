import moment from 'moment';
import { Link } from 'react-router-dom';

export type BlogScreenCardType = {
  _id?: string;
  id: string;
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

function BlogScreenCard({
  image,
  category,
  id,
  title,
  summary,
  user,
  createdAt,
  updatedAt,
}: BlogScreenCardType) {
  return (
    <div className="card mb-5 card-compact w-72 h-[490px] bg-base-100 shadow-xl">
      <figure className="h-[240px]">
        <img src={image} className="h-full w-full" alt="Blog Image Error" />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between gap-3">
          <Link to={`/blogs/${id}`} className="hover:underline card-title">
            {title}
          </Link>
          <span className={` badge badge-${category} uppercase`}>
            {category}
          </span>
        </div>
        <div>
          <p>{summary}</p>
        </div>
        <div className="flex items-end h-full justify-between">
          <div className="flex items-center justify-center gap-1">
            <Link to={`/profile/${user._id}`}>
              <img
                src={user.image}
                className=" cursor-pointer rounded-full hover:opacity-60  h-10 w-10 object-cover"
                alt="User image error"
              />
            </Link>
            <div className="flex flex-col items-start justify-center">
              <Link
                to={`/profile/${user._id}`}
                className=" font-semibold hover:underline"
              >
                {user.name}
              </Link>
              {createdAt === updatedAt ? (
                <p className=" text-xs text-slate-500">
                  {moment(createdAt).calendar()}
                </p>
              ) : (
                <div className="flex text-slate-500 flex-col items-start justify-center">
                  <p className=" text-xs ">{moment(updatedAt).calendar()}</p>
                  <i>(edited)</i>
                </div>
              )}
            </div>
          </div>
          <div>
            <Link
              to={`/blogs/${id}`}
              className="text-primary text-base hover:underline hover:decoration-primary"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogScreenCard;
