import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { useGetAllPostsQuery } from '../hooks/blogReactQueryHooks';
import { getAllBlogs } from '../features/blogSlice';
import { type Error, errorHandler } from '../utils/errorHandler';
import { toast } from 'react-toastify';
import Loading from '../utils/Loading';
import BlogScreenCard from '../utils/BlogScreenCard';
import { Helmet } from 'react-helmet-async';

function BlogScreen() {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blogs);
  const { data, isLoading, isError, error } = useGetAllPostsQuery();
  useEffect(() => {
    if (data) {
      dispatch(getAllBlogs(data!));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error(errorHandler(error as Error));
  }
  if (blogs.length === 0) {
    return <p className="mt-4 text-center font-bold text-lg">No post yet.</p>;
  }
  return (
    <div>
      <Helmet>
        <title>Blogs - Blogverse</title>
      </Helmet>
      <h1 className="font-bold text-3xl">All Blogs:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mt-5 place-content-center place-items-center ">
        {blogs.map((val) => {
          return (
            <BlogScreenCard
              key={val._id}
              id={val._id}
              title={val.title}
              summary={val.summary}
              description={val.description}
              createdAt={val.createdAt}
              category={val.category}
              updatedAt={val.updatedAt}
              image={val.image}
              user={val.user}
              postLikes={val.postLikes}
            />
            // <div
            //   key={val._id}
            //   className="card card-compact w-72 h-[490px] bg-base-100 shadow-xl"
            // >
            //   <figure className="h-[240px]">
            //     <img
            //       src={val.image}
            //       className="h-full w-full"
            //       alt="Blog Image Error"
            //     />
            //   </figure>
            //   <div className="card-body">
            //     <div className="flex items-center justify-between">
            //       <span className={` badge badge-${val.category} uppercase`}>
            //         {val.category}
            //       </span>
            //       <span>Likes</span>
            //     </div>
            //     <div>
            //       <Link
            //         to={`/blogs/${val._id}`}
            //         className="hover:underline card-title"
            //       >
            //         {val.title}
            //       </Link>
            //       <p>{val.summary}</p>
            //     </div>
            //     <div className="flex items-end h-full justify-between">
            //       <div className="flex items-center justify-center gap-1">
            //         <Link to={`/profile/${val.user._id}`}>
            //           <img
            //             src={val.user.image}
            //             className=" cursor-pointer rounded-full hover:opacity-60  h-10 w-10 object-cover"
            //             alt="User image error"
            //           />
            //         </Link>
            //         <div className="flex flex-col items-start justify-center">
            //           <Link
            //             to={`/profile/${val.user._id}`}
            //             className=" font-semibold hover:underline"
            //           >
            //             {val.user.name}
            //           </Link>
            //           {val.createdAt === val.updatedAt ? (
            //             <p className=" text-xs text-slate-500">
            //               {moment(val.createdAt).calendar()}
            //             </p>
            //           ) : (
            //             <div className="flex flex-col items-start justify-center">
            //               <p className=" text-xs text-slate-500">
            //                 {moment(val.updatedAt).calendar()}
            //               </p>
            //               <i>(updated)</i>
            //             </div>
            //           )}
            //         </div>
            //       </div>
            //       <div>
            //         <Link
            //           to={`/blogs/${val._id}`}
            //           className="text-primary text-base hover:underline hover:decoration-primary"
            //         >
            //           Read more
            //         </Link>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogScreen;
