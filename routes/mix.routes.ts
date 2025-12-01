import { Router } from "express";
import { getMixById, postMix } from "../controllers/mix.controller";

const router = Router();

router.get("/:id", getMixById);
router.post("/", postMix);

export default router;
