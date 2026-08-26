import { Admin } from "../admin/admin.model";
import { ApiError } from "../../utils/ApiError";

export const loginUserService = async (
    email: string,
    password: string
) => {
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
        throw new ApiError(401, 'Invalid email or password')
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401, 'Invalid email or password')
    }

    return admin;
}

export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    throw new ApiError(401, "Email already registered!");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
  });

  return admin;
};