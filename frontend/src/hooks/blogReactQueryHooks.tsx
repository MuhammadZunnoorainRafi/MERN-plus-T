import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { BlogSingleType, blogDataT } from './BlogQueryTypes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './rtkHooks';

// const {} = useAppSelector(state=>state.auth)

export const useGetAllPostsQuery = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get('/api/blog');
      return res.data;
    },
  });
};

export const useGetOnePostQuery = (id: string | undefined) => {
  return useQuery<BlogSingleType>({
    queryKey: ['post', id],
    queryFn: async () => {
      const res = await axios.get(`/api/blog/${id}`);
      return res.data;
    },
  });
};

export const useCreatePostQuery = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);
  return useMutation({
    mutationFn: async (data: blogDataT) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.post('/api/blog', data, config);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(`Post Created "${data.title}"`);
      navigate('/blogs');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

export const useUpdatePostQuery = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: blogDataT) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.put('/api/blog/update', data, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['LinkProfileBlogs'] });
      navigate(`/blogs`);
    },
  });
};
