import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { type Error, errorHandler } from '../utils/errorHandler';
import moment from 'moment';
import React, { Suspense } from 'react';
import Loading from '../utils/Loading';
const LinkProfileBlogs = React.lazy(() => import('./LinkProfileBlogs'));

function LinkProfile() {
  const params = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['linkProfile', params.id],
    queryFn: async () => {
      const res = await axios.get(`api/get/profile/${params.id}`);
      return res.data;
    },
  });
  if (error) {
    toast.error(errorHandler(error as Error));
  }
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center ">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div>
      <div className="max-w-2xl mx-auto mt-6 ">
        <h1 className="font-bold text-center  text-3xl tracking-wider mb-4">
          User Profile
        </h1>
        <div className="flex-col md:flex-row flex p-3 rounded-md shadow-xl border border-base-300 items-start justify-start gap-3 mb-3 w-full">
          <div className="flex-1">
            <img
              src={data?.image}
              className="w-full object-cover rounded-md h-56"
              alt="No image"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-2xl mb-2">{data?.name}</h1>
            <p className="mb-1 text-base-content">
              {' '}
              <strong>Name:</strong> {data?.name}
            </p>
            <p className="mb-1 text-base-content">
              <strong>Email:</strong> {data?.email}
            </p>
            <p className="mb-1 text-base-content">
              <strong>About me:</strong> {data?.aboutMe}
            </p>
            <p className="mb-1 text-base-content">
              <strong>User Since:</strong> {moment(data?.createdAt).calendar()}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl py-3 mx-auto">
        <h1 className="font-bold text-4xl py-5">{data?.name} Blog Posts:</h1>
        <Suspense fallback={<Loading />}>
          <LinkProfileBlogs id={params.id!} />
        </Suspense>
      </div>
    </div>
  );
}

export default LinkProfile;
