import User from "../models/user.model";

export const findUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const findUserById = (id: string) => {
  return User.findById(id).select("-password");
};

export const createUser = (data: { name: string; email: string; password: string }) => {
  return User.create(data);
};