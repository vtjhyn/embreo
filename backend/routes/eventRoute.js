import express from "express";
import { getEvent, getEventById, addEvent, approveEvent } from "../controllers/eventController.js";

const router = express.Router();

router.get("/event:id", getEvent);
router.get("/event:id", getEventById);
router.post("/addevent", addEvent);
router.put("/event:id", approveEvent);

export default router;