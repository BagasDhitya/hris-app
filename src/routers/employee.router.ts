import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";
import { AuthenticateMiddleware } from "../middlewares/authenticate.middleware";
import { AuthorizationMiddleware } from "../middlewares/authorize.middleware";

const employeeController = new EmployeeController();
const authenticateMiddleware = new AuthenticateMiddleware();
const authorizeMiddleware = new AuthorizationMiddleware();
const router = Router();

router.post(
  "/clock-in",
  authenticateMiddleware.authenticateToken.bind(authenticateMiddleware),
  authorizeMiddleware.authorizeRole("EMPLOYEE"),
  employeeController.clockIn.bind(employeeController)
);
router.post(
  "/clock-out",
  authenticateMiddleware.authenticateToken.bind(authenticateMiddleware),
  authorizeMiddleware.authorizeRole("EMPLOYEE"),
  employeeController.clockOut.bind(employeeController)
);
router.post(
  "/request-leave",
  authenticateMiddleware.authenticateToken.bind(authenticateMiddleware),
  authorizeMiddleware.authorizeRole("EMPLOYEE"),
  employeeController.requestLeave.bind(employeeController)
);

export default router;
