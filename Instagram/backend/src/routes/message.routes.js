import { Router } from "express";
import { deleteMessage, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/send/:receiverId", sendMessage);
router.get("/get/:receiverId", getMessages);
router.delete("/delete/:messageId", deleteMessage);

export default router;
