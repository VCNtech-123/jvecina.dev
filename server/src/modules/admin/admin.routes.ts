import { Router } from "express";
import { protect } from "../../middleware/auth.middleware";
import { publish } from "./admin.controller";

const router = Router();

router.post("/publish", protect, publish);

export default router;