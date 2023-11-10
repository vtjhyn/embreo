import express from "express";
import {
  getEvent,
  addEvent,
  getEventByHR,
  getEventByVendor,
  eventApprovement,
} from "../controllers/eventController.js";

const router = express.Router();

router.get("/event/:id", getEvent);
router.get("/event/hr/:id", getEventByHR);
router.get("/event/vendor/:id", getEventByVendor);
router.post("/addevent", addEvent);
router.patch("/approvement/:id", eventApprovement);

export default router;
