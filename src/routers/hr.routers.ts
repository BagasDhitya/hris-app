import { Router } from "express";
import { HRController } from "../controllers/hr.controller";

const hrController = new HRController();
const router = Router();

router.patch("/approve-leave", hrController.approveLeave.bind(hrController));
router.get("/clock-ins", hrController.getClockIns.bind(hrController));

export default router;
