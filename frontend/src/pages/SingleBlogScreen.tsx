import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetOnePostQuery } from '../hooks/blogReactQueryHooks';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { getSinglePost } from '../features/blogSlice';
import { type Error, errorHandler } from '../utils/errorHandler';
import { toast } from 'react-toastify';
import moment from 'moment';
import Loading from '../utils/Loading';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from 'react';
import {
  useCreateCommentQuery,
  useDeleteCommentQuery,
  useGetCommentQuery,
} from '../hooks/commentsReactQueryHook';
import { getComments } from '../features/commentSlice';
import UpdateCommentModal from '../assets/UpdateCommentModal';
import { Helmet } from 'react-helmet-async';

function SingleBlogScreen() {
  const schemaComment = z.object({
    comment: z.string().nonempty('Enter comment'),
  });

  const params = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetOnePostQuery(params.id);
  const { data: commentData, error: commentError } = useGetCommentQuery(
    params.id as string
  );
  const { comments } = useAppSelector((state) => state.comment);
  useEffect(() => {
    if (data) {
      dispatch(getSinglePost(data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    if (commentData) {
      dispatch(getComments(commentData));
    }
  }, [commentData, dispatch]);
  const { user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading: isLoadingDelete } = useMutation({
    mutationFn: async (id: string) => {
      const config = {
        data: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.delete(`/api/blog/delete`, config);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['LinkProfileBlogs'] });
      navigate('/blogs');
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    comment: string;
  }>({
    resolver: zodResolver(schemaComment),
  });

  const { mutate: commentMutate, isLoading: commentIsLoading } =
    useCreateCommentQuery();
  const formSubmitComment = ({ comment }: { comment: string }) => {
    try {
      const dataWithParam = {
        blogId: params.id,
        comment,
      };
      commentMutate(dataWithParam);
      reset();
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  const { blog } = useAppSelector((state) => state.blogs);
  const { isLoading: deleteCommentLoading, mutate: commentDeleteMutate } =
    useDeleteCommentQuery(params.id as string);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    toast.error(errorHandler(error as Error));
  }
  if (commentError) {
    toast.error(errorHandler(commentError as Error));
  }

  const handleDelete = (id: string) => {
    try {
      mutate(id);
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  const handleCommentDelete = async (id: string) => {
    try {
      commentDeleteMutate(id);
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-3">
      <Helmet>
        <title>{`${blog?.title}`} - Blogverse</title>
      </Helmet>
      <div className="md:flex md:flex-row flex-col items-center justify-between gap-4">
        <h1 className="font-bold w-2/5 text-2xl md:text-4xl">{blog?.title}</h1>
        {blog?.user._id === user?._id && (
          <div className=" flex items-center py-2 justify-center gap-1">
            <Link
              className="btn btn-accent flex-1 text-white btn-sm"
              to={`/profile/blog/${blog?._id}/edit`}
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(blog?._id as string)}
              className={` ${
                isLoadingDelete ? ' cursor-wait' : ''
              } btn  flex-1 btn-error hover:bg-red-500 hover:bg-opacity-90 text-white btn-sm`}
            >
              Delete
            </button>
          </div>
        )}
        <span
          className={` badge badge-lg font-bold badge-${blog?.category} uppercase`}
        >
          {blog?.category}
        </span>
      </div>
      <div className="max-w-4xl mx-auto md:h-[650px] rounded-lg">
        <img
          src={blog?.image}
          className="max-w-full max-h-full mx-auto rounded-lg object-cover"
          alt="Single post image error"
        />
      </div>
      <div className="flex items-center  justify-between bg-base-300 text-base-content p-2 rounded-md">
        <div className="flex items-center  justify-center gap-1">
          <Link to={`/profile/${blog?.user._id}`}>
            <img
              src={blog?.user.image}
              className=" cursor-pointer rounded-full hover:opacity-60  h-12 w-12 object-cover"
              alt="User image error"
            />
          </Link>
          <Link
            to={`/profile/${blog?.user._id}`}
            className=" font-semibold text-lg hover:underline"
          >
            {blog?.user.name}
          </Link>
        </div>
        <div>
          {blog?.createdAt === blog?.updatedAt ? (
            <p className="  text-slate-500">
              {moment(blog?.createdAt).calendar()}
            </p>
          ) : (
            <div className="flex text-slate-500 flex-col items-start justify-center">
              <p className="  ">{moment(blog?.updatedAt).calendar()}</p>
              <i>(edited)</i>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="font-bold text-xl">Summary: {blog?.summary}</p>
      </div>
      <div>{blog?.description}</div>
      <div className="py-3">
        <h1 className="font-bold text-3xl mb-2">Comments:</h1>
        {user ? (
          <div className="flex items-center justify-center gap-2">
            <img
              src={user?.image}
              className="h-12 w-12 object-cover rounded-full"
              alt="Comment User Image Error"
            />
            <div className=" flex-grow">
              <form
                className="flex items-center justify-center gap-2"
                onSubmit={handleSubmit(formSubmitComment)}
              >
                <div className="space-y-1 flex-grow ">
                  <input
                    {...register('comment')}
                    type="text"
                    className=" input input-md w-full border border-slate-500   "
                    placeholder="Write comment"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.comment?.message}
                  </p>
                </div>
                {commentIsLoading ? (
                  <button className="btn btn-sm">
                    <span className=" loading loading-spinner loading-sm"></span>
                  </button>
                ) : (
                  <button type="submit" className="btn btn-sm btn-primary">
                    Add
                  </button>
                )}
              </form>
            </div>
          </div>
        ) : (
          <div className="flex gap-1 items-center justify-center">
            <Link className=" link link-primary font-semibold " to={'/login'}>
              Login
            </Link>
            <span> is required for comment</span>
          </div>
        )}
        <Suspense fallback={<Loading />}>
          <div className="mt-5 space-y-2">
            {comments?.map((val) => {
              return (
                <div
                  key={val._id}
                  className="p-2 rounded-md  border border-slate-400"
                >
                  <div className="flex m-1 items-start justify-start gap-2">
                    <Link to={`/profile/${val.user._id}`}>
                      <img
                        src={val.user.image}
                        className=" cursor-pointer rounded-full hover:opacity-60  h-12 w-12 object-cover"
                        alt="User image error"
                      />
                    </Link>
                    <div>
                      <h1 className="font-bold">{val.user.name}</h1>
                      {val.createdAt === val.updatedAt ? (
                        <p className=" text-xs text-slate-500">
                          {moment(val.createdAt).calendar()}
                        </p>
                      ) : (
                        <div className=" flex items-center justify-start text-slate-500 space-x-1">
                          <p className=" text-xs ">
                            {moment(val.updatedAt).calendar()}
                          </p>
                          <i className="text-sm text-slate-500">(edited)</i>
                        </div>
                      )}
                      <p>{val.comment}</p>
                      {val.user._id === user?._id && (
                        <div className="flex items-center mt-2 justify-start gap-2">
                          <UpdateCommentModal
                            defVal={val.comment}
                            cmntId={val._id}
                            paramsId={params.id as string}
                          />
                          <button
                            onClick={() => handleCommentDelete(val._id)}
                            className={`${
                              deleteCommentLoading ? 'cursor-wait' : ''
                            } btn hover:bg-red-500 hover:bg-opacity-90  btn-xs btn-error text-white`}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default SingleBlogScreen;
