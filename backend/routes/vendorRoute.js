import express from "express";
import { getVendorList } from "../controllers/vendorController.js";


const router = express.Router();

router.get('/vendors', getVendorList)

export default router;