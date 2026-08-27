import { z } from "zod";

const zBoolFromString = z.preprocess((val) => {
  if (val === undefined) return undefined;
  if (val === true || val === "true") return true;
  if (val === false || val === "false") return false;
  return val;
}, z.boolean().optional());

export const createMessageSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80),
    email: z.email().trim().max(120),
    subject: z.string().trim().min(2).max(120),
    message: z.string().trim().min(10).max(2000),
  }).strict(),
  params: z.object({}).strict(),
  query: z.object({}).strict(),
});

export const getMessagesSchema = z.object({
  body: z.object({}).strict(),
  params: z.object({}).strict(),
  query: z.object({
    read: zBoolFromString,
    page: z.coerce.number().int().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(50).optional(),
  }).strict(),
});

export const markMessageReadSchema = z.object({
  body: z.object({}).strict(),
  params: z.object({
    id: z.string().min(1),
  }).strict(),
  query: z.object({}).strict(),
});

export const deleteMessageSchema = z.object({
  body: z.object({}).strict(),
  params: z.object({
    id: z.string().min(1),
  }).strict(),
  query: z.object({}).strict(),
});