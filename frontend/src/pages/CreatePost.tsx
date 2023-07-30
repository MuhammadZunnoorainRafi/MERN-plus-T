import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreatePostQuery } from '../hooks/blogReactQueryHooks';
import { toast } from 'react-toastify';
import { type Error, errorHandler } from '../utils/errorHandler';
import { blogDataT } from '../hooks/BlogQueryTypes';
import { useState } from 'react';

export type typeCreatePost = {
  title: string;
  summary: string;
  image: string;
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
};
function CreatePost() {
  const CreatePostSchema = z.object({
    title: z.string().nonempty('Enter title'),
    summary: z
      .string()
      .nonempty('Enter summary')
      .max(100, 'Letters more than 100 are not allowed'),
    image: z.any().refine((files) => files?.length == 1, 'Select an Image.'),
    description: z.string().nonempty('Enter description'),
    category: z
      .enum(
        [
          'technology',
          'politics',
          'sports',
          'health',
          'travel',
          'business',
          'Select Category',
        ],
        {
          required_error: 'select a category',
        }
      )
      .refine((val) => val !== 'Select Category', 'Select a category'),
  });
  const {
    register,
    formState: { errors },
    getValues,
    watch,
    handleSubmit,
  } = useForm<typeCreatePost>({
    defaultValues: {
      summary: '',
    },
    resolver: zodResolver(CreatePostSchema),
  });
  watch('summary');
  const [loading, setLoading] = useState(false);
  const { mutate, isLoading } = useCreatePostQuery();
  const formSubmit = async ({
    title,
    image,
    description,
    category,
    summary,
  }: typeCreatePost) => {
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
      const blogData: blogDataT = {
        image: res.data.secure_url,
        title,
        summary,
        description,
        category,
      };

      mutate(blogData);
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2">
      <h1 className="text-2xl font-bold mb-3">Create Post</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="form-control space-y-2"
      >
        <div>
          <input
            className=" input mb-1 border border-slate-400 w-full"
            {...register('title')}
            placeholder="Enter title"
            type="text"
          />
          <p className="text-red-500 text-sm">{errors.title?.message}</p>
        </div>
        <div>
          <input
            maxLength={100}
            className=" input mb-1 border border-slate-400 w-full"
            {...register('summary')}
            placeholder="Enter summary"
            type="text"
          />
          <div className="flex">
            {errors.summary && (
              <p className="text-red-500 text-sm py-1">
                {errors.summary.message}
              </p>
            )}
            <p className=" text-slate-500 ml-auto">
              {getValues('summary').length}/100
            </p>
          </div>
        </div>
        <div>
          <input
            className=" file-input mb-1 file-border border-slate-400 w-full"
            {...register('image')}
            type="file"
            placeholder="Enter Your Image"
            accept=".png,.jpg,.jpeg"
          />
          <p className="text-red-500 text-sm">{errors.image?.message}</p>
        </div>
        <div>
          <select
            className=" select mb-1 border border-slate-400 w-full"
            {...register('category')}
            defaultValue={'Select Category'}
          >
            <option disabled>Select Category</option>
            <option value="technology">Technology</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
            <option value="travel">Travel</option>
            <option value="business">Business</option>
          </select>
          <p className="text-red-500 text-sm">{errors.category?.message}</p>
        </div>
        <div>
          <textarea
            {...register('description')}
            placeholder="Type something..."
            className="textarea border border-slate-400 textarea-lg w-full"
          />
          <p className="text-red-500 text-sm">{errors.description?.message}</p>
        </div>
        {loading || isLoading ? (
          <button className="btn btn-wide mx-auto">
            <span className="loading loading-spinner normal-case"></span>
            Loading
          </button>
        ) : (
          <button
            type="submit"
            className="btn mx-auto btn-primary btn-wide normal-case"
          >
            Create Post
          </button>
        )}
      </form>
    </div>
  );
}

export default CreatePost;
