import { Router } from "express";
import { getSoundById } from "../controllers/sound.controller";

const router = Router();

router.get("/", getSoundById);

export default router;
