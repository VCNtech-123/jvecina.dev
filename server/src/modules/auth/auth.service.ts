import { Admin } from "../admin/admin.model";
import { ApiError } from "../../utils/ApiError";

export const loginUser = async (
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