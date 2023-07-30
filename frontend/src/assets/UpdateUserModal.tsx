import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useUpdUserQuery } from '../hooks/userReactQueryHooks';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { updateUser } from '../features/authSlice';
import { errorHandler } from '../utils/errorHandler';
import { toast } from 'react-toastify';
import type { Error } from '../utils/errorHandler';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { useNavigate } from 'react-router-dom';

function UpdateUserModal() {
  type formType = {
    image: string;
    name: string;
    email: string;
    aboutMe: string;
    password: string;
    password2: string;
  };

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const schema = z
    .object({
      image: z.any().refine((files) => files.length == 1, 'Select an image'),
      name: z.string().nonempty('Enter your name'),
      aboutMe: z
        .string()
        .nonempty('Enter about yourself')
        .trim()
        .max(100, 'letters more than above 100 are not allowed'),
      email: z
        .string()
        .nonempty('Enter your email')
        .email('Enter a valid Email'),
      password: z
        .string()
        .nonempty('Enter your password')
        .min(5, 'Password must contains at least 6 characters'),
      password2: z.string().nonempty('Enter your confirm password'),
    })
    .refine((data) => data.password === data.password2, {
      message: "Passwords don't match",
      path: ['password2'],
    });

  const {
    register,
    getValues,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<formType>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      aboutMe: user?.aboutMe,
    },
    resolver: zodResolver(schema),
  });
  watch('aboutMe');
  const { mutateAsync, isLoading } = useUpdUserQuery();
  const [loading, setLoading] = useState(false);
  const formSubmit = async ({
    aboutMe,
    image,
    name,
    email,
    password,
  }: formType) => {
    try {
      const file = image[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'blog-mernt');
      setLoading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dk5gpbckp/image/upload`,
        formData
      );
      setLoading(false);
      const updData = {
        id: user?._id,
        image: res.data.secure_url,
        name,
        aboutMe,
        email,
        password,
      };
      const result = await mutateAsync(updData);
      navigate('/');
      dispatch(updateUser(result));
      toast.success(`Username updated to ${result.name}`);
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  return (
    <div>
      <div className="   flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className=" w-full btn btn-accent text-white"
        >
          Update User
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full relative max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg mb-2 text-center font-bold leading-6 text-gray-800"
                  >
                    Update User
                  </Dialog.Title>

                  <form
                    className=" form-control space-y-2"
                    onSubmit={handleSubmit(formSubmit)}
                  >
                    <div>
                      <input
                        className=" file-input file-input-primary file-input-bordered  bg-white text-slate-900 w-full "
                        {...register('image')}
                        type="file"
                        placeholder="Enter Your Image"
                      />
                      {errors.image && (
                        <p className="text-red-500 text-sm py-1">
                          {errors.image.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        className=" input input-primary bg-white text-slate-900  w-full"
                        {...register('name')}
                        type="text"
                        placeholder="Enter Your Name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm py-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        className=" input  bg-white text-slate-900 input-primary  w-full"
                        {...register('email')}
                        type="email"
                        placeholder="Enter Your Email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm py-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <textarea
                        placeholder="About yourself"
                        {...register('aboutMe')}
                        maxLength={100}
                        className="textarea text-lg  bg-white text-slate-900 placeholder:text-slate-500 placeholder:text-base mb-[3px] textarea-primary  textarea-bordered textarea-md w-full "
                      />
                      <div className="flex">
                        {errors.aboutMe && (
                          <p className="text-red-500 text-sm py-1">
                            {errors.aboutMe.message}
                          </p>
                        )}
                        <p className=" text-slate-500 ml-auto">
                          {getValues('aboutMe').length}/100
                        </p>
                      </div>
                    </div>
                    <div>
                      <input
                        className=" input  bg-white text-slate-900 input-primary placeholder:text-slate-500 w-full"
                        {...register('password')}
                        type="password"
                        placeholder="Enter Your Password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm py-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        className=" input  bg-white text-slate-900 input-primary placeholder:text-slate-500 w-full"
                        {...register('password2')}
                        type="password"
                        placeholder="Enter Your Confirm Password"
                      />
                      {errors.password2 && (
                        <p className="text-red-500 text-sm py-1">
                          {errors.password2.message}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={closeModal}
                      className="btn btn-circle border-none absolute bg-white text-slate-900 hover:bg-slate-300 top-0 right-2 btn-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <div className="flex items-center justify-end gap-2 ">
                      {isLoading || loading ? (
                        <button className="btn btn-sm">
                          <span className="loading normal-case loading-spinner"></span>
                          Loading
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-sm btn-accent">
                          Update
                        </button>
                      )}
                      <button
                        type="button"
                        className="inline-flex  justify-center rounded-lg border border-transparent bg-slate-200 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default UpdateUserModal;
