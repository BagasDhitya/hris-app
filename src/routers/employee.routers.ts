import { Router } from "express";
import { EmployeeController } from "../controllers/employee.controller";

const employeeController = new EmployeeController();
const router = Router();

router.post("/clock-in", employeeController.clockIn.bind(employeeController));
router.post("/clock-out", employeeController.clockOut.bind(employeeController));
router.post(
  "/request-leave",
  employeeController.requestLeave.bind(employeeController)
);

export default router;
