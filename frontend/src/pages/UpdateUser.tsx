import { useAppSelector } from '../hooks/rtkHooks';
import UpdateUserModal from '../assets/UpdateUserModal';
import DeleteUserModal from '../assets/DeleteUserModal';
import moment from 'moment';
import { Suspense } from 'react';
import Loading from '../utils/Loading';
import { Helmet } from 'react-helmet-async';
import React from 'react';
const LinkProfileBlogs = React.lazy(() => import('./LinkProfileBlogs'));

function UpdateUser() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div>
      <Helmet>
        <title>Profile - Blogverse</title>
      </Helmet>
      <div className="max-w-2xl mx-auto mt-6 ">
        <h1 className="font-bold text-center  text-3xl tracking-wider mb-4">
          User Profile
        </h1>
        <div className="md:flex-row flex flex-col p-3 rounded-md shadow-xl border border-base-300 items-start justify-start gap-3 mb-3 w-full">
          <div className="flex-1">
            <img
              src={user?.image}
              className="w-full object-cover rounded-md h-56"
              alt="No image"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-2xl mb-2">{user?.name}</h1>
            <p className="mb-1 text-base-content">
              {' '}
              <strong>Name:</strong> {user?.name}
            </p>
            <p className="mb-1 text-base-content">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="mb-1 text-base-content">
              <strong>About me:</strong> {user?.aboutMe}
            </p>
            <p className="mb-1 text-base-content">
              <strong>User Since:</strong> {moment(user?.createdAt).calendar()}
            </p>
          </div>
        </div>

        <div className="flex  items-center justify-center gap-2">
          <div className="flex-1">
            <UpdateUserModal />
          </div>
          <div className="flex-1">
            <DeleteUserModal />
          </div>
        </div>
      </div>
      <div className="max-w-5xl py-3 mx-auto">
        <h1 className="font-bold text-4xl py-5">{user?.name} Blog Posts:</h1>
        <Suspense fallback={<Loading />}>
          <LinkProfileBlogs id={user?._id as string} />
        </Suspense>
      </div>
    </div>
  );
}
export default UpdateUser;

// password: z
// .string()
// .min(8, {
//   message: "Password must be at least 8 characters long",
// })
// .max(100)
// .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
//   message:
//     "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
// }),
