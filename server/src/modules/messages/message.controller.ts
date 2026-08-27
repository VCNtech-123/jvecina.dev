import type { Request, Response, NextFunction } from "express";
import type { ValidatedLocals } from "../../middleware/validation.middleware";
import {
  createMessageSchema,
  getMessagesSchema,
  markMessageReadSchema,
  deleteMessageSchema
} from "./message.validation";
import * as messageService from "./message.service";

type CreateLocals = ValidatedLocals<typeof createMessageSchema>;
type GetLocals = ValidatedLocals<typeof getMessagesSchema>;
type ReadLocals = ValidatedLocals<typeof markMessageReadSchema>;
type DeleteLocals = ValidatedLocals<typeof deleteMessageSchema>;

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = (res.locals as CreateLocals).validated;

    const msg = await messageService.createMessage({
      ...body,
      ip: req.ip,
      userAgent: req.get("user-agent") || "",
    });

    return res.status(201).json({ status: "success", data: msg });
  } catch (err) {
    return next(err);
  }
};

export const getMessages = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = (res.locals as GetLocals).validated;

    const messages = await messageService.getMessages({
      read: query.read,
      page: query.page,
      limit: query.limit,
    });

    return res.status(200).json({ status: "success", results: messages.length, data: messages });
  } catch (err) {
    return next(err);
  }
};

export const markMessageRead = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = (res.locals as ReadLocals).validated;
    const msg = await messageService.markAsRead(params.id);
    return res.status(200).json({ status: "success", data: msg });
  } catch (err) {
    return next(err);
  }
};

export const deleteMessage = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = (res.locals as DeleteLocals).validated;
    await messageService.deleteMessage(params.id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
};