import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loading from '../utils/Loading';
import { toast } from 'react-toastify';
import { type Error, errorHandler } from '../utils/errorHandler';
import BlogScreenCard, { BlogScreenCardType } from '../utils/BlogScreenCard';
import { Helmet } from 'react-helmet-async';

function LinkProfileBlogs({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['LinkProfileBlogs'],
    queryFn: async () => {
      const res = await axios.get(`/api/get/profile/${id}/blogs`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(errorHandler(error as Error));
  }
  if (data.length === 0) {
    return <p className="font-bold">No blog yet</p>;
  }
  return (
    <div>
      <Helmet>
        <title>Profile - Blogverse</title>
      </Helmet>
      <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-3">
        {data ? (
          data!.map((val: BlogScreenCardType) => {
            return (
              <div key={val._id}>
                <BlogScreenCard
                  id={val._id!}
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
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default LinkProfileBlogs;
