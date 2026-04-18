export const successResponse = (data: any) => ({
  success: true,
  data,
});

export const errorResponse = (err: any) => ({
  success: false,
  error: {
    code: err.code || "INTERNAL_ERROR",
    message: err.message || "Something went wrong",
    details: err.details || null,
  },
});