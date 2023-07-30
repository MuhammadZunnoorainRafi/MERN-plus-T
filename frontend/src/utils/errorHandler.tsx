export interface Error {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
}

export const errorHandler = (error: Error) => {
  return error.response?.data?.message
    ? error.response.data.message
    : error.message;
};
