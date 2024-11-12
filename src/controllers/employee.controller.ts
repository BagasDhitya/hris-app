import { Request, Response } from "express";
import { EmployeeService } from "../services/employee.service";
import { Employee, ClockIn, Leave } from "../models/models";

export class EmployeeController {
  private employeeService: EmployeeService;

  constructor() {
    this.employeeService = new EmployeeService();
  }

  async clockIn(req: Request, res: Response) {
    const { employeeId } = req.body;
    const employee: Employee = {
      id: employeeId,
    };
    const result = await this.employeeService.clockIn(employee);
    if (result) {
      res.status(201).send({
        message: "Successfully clock in",
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: `Employee id : ${employee.id} was not found`,
        status: res.statusCode,
      });
    }
  }
  async clockOut(req: Request, res: Response) {
    const { id, employeeId } = req.body;
    const clockIn: ClockIn = {
      id: id,
    };
    const result = await this.employeeService.clockOut(clockIn);
    if (result) {
      res.status(201).send({
        message: "Successfully clock out",
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: `Employee id : ${employeeId} was not clock in`,
        status: res.statusCode,
      });
    }
  }
  async requestLeave(req: Request, res: Response) {
    const { employeeId, leaveType, startDate, endDate } = req.body;
    const leave: Leave = {
      employeeId: employeeId,
      leaveType: leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    const result = await this.employeeService.requestLeave(leave);
    if (result) {
      res.status(201).send({
        message: "Successfully request leave",
        status: res.statusCode,
      });
    } else {
      res.status(400).send({
        message: `Failed request leave. Please check your empty field before submitting`,
        status: res.statusCode,
      });
    }
  }
}
