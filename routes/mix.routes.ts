import { Router } from "express";
import { getMixById } from "../controllers/mix.controller";

const router = Router();

router.get("/:id", getMixById);

export default router;
