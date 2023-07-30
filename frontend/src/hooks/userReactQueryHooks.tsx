import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface regDataT {
  name?: string;
  email: string;
  password: string;
}
export const useRegUserQuery = () => {
  return useMutation({
    mutationFn: async (data: regDataT) => {
      const res = await axios.post('/api/reg', data);
      return res.data;
    },
  });
};

export const useLogUserQuery = () => {
  return useMutation({
    mutationFn: async (data: regDataT) => {
      const res = await axios.post('/api/log', data);
      return res.data;
    },
  });
};

export const useUpdUserQuery = () => {
  return useMutation({
    mutationFn: async (data: regDataT) => {
      const res = await axios.put('/api/upd', data);
      return res.data;
    },
  });
};

export const useDeleteUserQuery = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const config = {
        data: {
          id: id,
        },
      };
      const res = await axios.delete('/api/delUser', config);
      return res.data;
    },
  });
};
