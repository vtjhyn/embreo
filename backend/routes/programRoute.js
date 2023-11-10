import express from "express";
import {
  addProgram,
  getProgramList,
} from "../controllers/programController.js";

const router = express.Router();

router.get("/programs", getProgramList);
router.post("/programs", addProgram);

export default router;
