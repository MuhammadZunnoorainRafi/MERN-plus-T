import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLogUserQuery } from '../hooks/userReactQueryHooks';
import { toast } from 'react-toastify';
import { errorHandler } from '../utils/errorHandler';
import type { Error } from '../utils/errorHandler';
import { useAppDispatch, useAppSelector } from '../hooks/rtkHooks';
import { login } from '../features/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

function Login() {
  type formType = {
    email: string;
    password: string;
  };
  const { search } = useLocation();

  const redirectString = new URLSearchParams(search).get('redirect');
  const redirect = redirectString ? redirectString : '/';

  const navigate = useNavigate();

  const schema = z.object({
    email: z.string().nonempty('Enter your email').email('Enter a valid Email'),
    password: z
      .string()
      .nonempty('Enter your password')
      .min(5, 'Password must contains atleast 6 characters'),
  });

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, redirect, user]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formType>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isLoading } = useLogUserQuery();
  const formSubmit = async (data: formType) => {
    try {
      const logData = await mutateAsync(data);
      dispatch(login(logData));
      navigate(redirect);
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Login - Blogverse</title>
      </Helmet>
      <Link
        className="btn btn-sm btn-neutral left-6 top-24 bg-black text-white absolute "
        to="/"
      >
        Back
      </Link>
      <div className="max-w-lg mx-auto mt-10 ">
        <h1 className="font-bold text-2xl md:text-3xl text-center mb-1">
          Welcome to Blogverse
        </h1>
        <p className="text-center tracking-widest mb-2 ">
          Start creating your blogs faster and better
        </p>
        <form
          className=" form-control space-y-3 "
          onSubmit={handleSubmit(formSubmit)}
        >
          <div>
            <input
              className=" input input-primary  placeholder:text-slate-500 w-full"
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
          {isLoading ? (
            <button className="btn btn-wide mx-auto">
              <span className="loading loading-spinner normal-case"></span>
              Loading
            </button>
          ) : (
            <button type="submit" className="btn mx-auto btn-wide btn-primary ">
              Login
            </button>
          )}
        </form>
        <div className="divider ">or</div>

        <p className="tracking-widest text-center">
          Don&apos;t you have an account?{' '}
          <Link to="/register" className=" link link-primary">
            Register
          </Link>{' '}
        </p>
      </div>
    </div>
  );
}

export default Login;
