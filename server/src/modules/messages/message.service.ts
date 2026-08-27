import { ApiError } from "../../utils/ApiError";
import { Message } from "./message.model";

export const createMessage = async (payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip?: string;
  userAgent?: string;
}) => {
  return Message.create(payload);
};

export const getMessages = async (opts?: { read?: boolean; page?: number; limit?: number }) => {
  const page = opts?.page ?? 1;
  const limit = opts?.limit ?? 20;
  const skip = (page - 1) * limit;

  const filter: Record<string, any> = {};
  if (typeof opts?.read === "boolean") {
    filter.readAt = opts.read ? { $ne: null } : null;
  }

  const messages = await Message.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return messages;
};

export const markAsRead = async (id: string) => {
  const msg = await Message.findByIdAndUpdate(
    id,
    { readAt: new Date() },
    { new: true }
  );

  if (!msg) throw new ApiError(404, "Message not found");
  return msg;
};

export const deleteMessage = async (id: string) => {
  const msg = await Message.findByIdAndDelete(id);
  if (!msg) throw new ApiError(404, "Message not found");
  return msg;
};