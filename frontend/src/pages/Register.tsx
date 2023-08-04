import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRegUserQuery } from '../hooks/userReactQueryHooks';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { regUser } from '../features/authSlice';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { type Error, errorHandler } from '../utils/errorHandler';
import { useEffect, useState } from 'react';
import ButtonLoading from '../utils/ButtonLoading';
import { Helmet } from 'react-helmet-async';

function Register() {
  type formType = {
    image: string;
    name: string;
    email: string;
    aboutMe: string;
    password: string;
    password2: string;
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  // Zod schema
  const schema = z
    .object({
      image: z.any().refine((files) => files?.length == 1, 'Select an Image.'),
      name: z.string().nonempty('Enter your name'),
      email: z
        .string()
        .nonempty('Enter your email')
        .email('Enter a valid Email'),
      aboutMe: z
        .string()
        .nonempty('Enter about yourself')

        .max(100, 'letters more than above 100 are not allowed')
        .trim(),
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

  // Checking current user
  const { search } = useLocation();
  const redirectString = new URLSearchParams(search).get('redirect');
  const redirect = redirectString ? redirectString : '/';
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  // React Hook Form
  const {
    getValues,
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues: {
      aboutMe: '',
    },
  });
  watch('aboutMe');
  const { mutateAsync, isLoading } = useRegUserQuery();
  const [loading, setLoading] = useState(false);

  const formSubmit = async ({
    aboutMe,
    name,
    email,
    password,
    image,
  }: formType) => {
    try {
      setLoading(true);
      const file = image[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'blog-mernt');

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dk5gpbckp/image/upload`,
        formData
      );
      setLoading(false);
      const regData = {
        image: res.data.secure_url,
        name,
        email,
        aboutMe,
        password,
      };
      const result = await mutateAsync(regData);
      dispatch(regUser(result));
      toast.success(`Welcome ${result.name}`);
      navigate('/');
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };
  return (
    <div className="max-w-lg mx-auto ">
      <Helmet>
        <title>Register - Blogverse</title>
      </Helmet>
      <h1 className="font-bold text-2xl md:text-3xl text-center mb-3">
        Register to Blogverse
      </h1>
      <form
        className=" form-control space-y-3 "
        onSubmit={handleSubmit(formSubmit)}
      >
        <div>
          <input
            className="file-input file-input-bordered w-full "
            {...register('image')}
            type="file"
            placeholder="Enter Your Image"
            accept="image/png, image/jpg, image/jpeg"
          />
          {errors.image && (
            <p className="text-red-500 text-sm py-1">{errors.image.message}</p>
          )}
        </div>
        <div>
          <input
            className=" input input-primary  placeholder:text-slate-500 w-full"
            {...register('name')}
            type="text"
            placeholder="Enter Your Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm py-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            className=" input input-primary  placeholder:text-slate-500 w-full"
            {...register('email')}
            type="email"
            placeholder="Enter Your Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm py-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <textarea
            placeholder="About yourself"
            {...register('aboutMe')}
            maxLength={100}
            className="textarea placeholder:text-slate-500 placeholder:text-base mb-[3px] textarea-primary  textarea-bordered textarea-sm w-full "
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
            className=" input input-primary placeholder:text-slate-500 w-full"
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
            className=" input input-primary placeholder:text-slate-500 w-full"
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
        {loading || isLoading ? (
          <ButtonLoading />
        ) : (
          <button type="submit" className="btn mx-auto btn-wide btn-primary ">
            Register
          </button>
        )}
        <p className="text-center tracking-widest">
          Already have an account?{' '}
          <Link to="/login" className=" link link-primary">
            Login
          </Link>{' '}
        </p>
      </form>
    </div>
  );
}
export default Register;

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
