import { Router } from "express";
import { HRController } from "../controllers/hr.controller";
import { AuthenticateMiddleware } from "../middlewares/authenticate.middleware";
import { AuthorizationMiddleware } from "../middlewares/authorize.middleware";

const hrController = new HRController();
const authenticateMiddleware = new AuthenticateMiddleware();
const authorizeMiddleware = new AuthorizationMiddleware();
const router = Router();

router.patch(
  "/approve-leave",
  authenticateMiddleware.authenticateToken.bind(authenticateMiddleware),
  authorizeMiddleware.authorizeRole("HR"),
  hrController.approveLeave.bind(hrController)
);
router.get(
  "/clock-ins",
  authenticateMiddleware.authenticateToken.bind(authenticateMiddleware),
  authorizeMiddleware.authorizeRole("HR"),
  hrController.getClockIns.bind(hrController)
);

export default router;
