import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from './rtkHooks';
import axios from 'axios';

export const useCreateCommentQuery = () => {
  const { user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      comment: string;
      blogId: string | undefined;
    }) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.post(
        `/api/blog/${data.blogId}/comments`,
        {
          comment: data.comment,
        },
        config
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export const useGetCommentQuery = (id: string) => {
  return useQuery({
    queryKey: ['comments'],
    queryFn: async () => {
      const res = await axios.get(`/api/blog/${id}/comments`);
      return res.data;
    },
  });
};

export const useUpdateCommentQuery = (id: string, closeModal: () => void) => {
  const { user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { cmntId: string; comment: string }) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.put(`/api/blog/${id}/comments`, data, config);
      closeModal();
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

export const useDeleteCommentQuery = (id: string) => {
  const { user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (delId: string) => {
      const config = {
        data: {
          id: delId,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.delete(`/api/blog/${id}/comments`, config);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
