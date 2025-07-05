export const successResponse = <T>(message: string, data: T) => ({
  status: 1,
  message,
  data: {},
});

export const errorResponse = <T>(message: string, data: T) => ({
  status: 0,
  message,
  data: {},
});
