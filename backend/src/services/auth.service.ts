import jwt from "jsonwebtoken";
import * as repo from "../repositories/auth.repository";
import { ApiError } from "../utils/ApiError";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const signToken = (userId: string) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as any);

export const registerService = async (name: string, email: string, password: string) => {
  const existing = await repo.findUserByEmail(email);
  if (existing) throw new ApiError(409, "CONFLICT", "Email already in use");

  const user = await repo.createUser({ name, email, password });
  const token = signToken(String(user._id));

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

export const loginService = async (email: string, password: string) => {
  // Need password field — findOne without .select("-password")
  const user = await repo.findUserByEmail(email);
  if (!user) throw new ApiError(401, "UNAUTHORIZED", "Invalid email or password");

  const valid = await user.comparePassword(password);
  if (!valid) throw new ApiError(401, "UNAUTHORIZED", "Invalid email or password");

  const token = signToken(String(user._id));

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

export const getMeService = async (userId: string) => {
  const user = await repo.findUserById(userId);
  if (!user) throw new ApiError(404, "NOT_FOUND", "User not found");
  return user;
};