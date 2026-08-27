import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validation.middleware";
import {
  createMessageSchema,
  getMessagesSchema,
  markMessageReadSchema,
  deleteMessageSchema
} from "./message.validation";
import {
  createMessage,
  getMessages,
  markMessageRead,
  deleteMessage
} from "./message.controller";
import { contactLimiter } from "../../middleware/rateLimit.middleware";

const router = Router();


router.post("/", contactLimiter, validate(createMessageSchema), createMessage);

router.get("/", protect, validate(getMessagesSchema), getMessages);
router.patch("/:id/read", protect, validate(markMessageReadSchema), markMessageRead);
router.delete("/:id", protect, validate(deleteMessageSchema), deleteMessage);

export default router;