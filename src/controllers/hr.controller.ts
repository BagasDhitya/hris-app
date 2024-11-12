import { Request, Response } from "express";
import { HRService } from "../services/hr.service";
import { Leave } from "../models/models";

export class HRController {
  private hrService: HRService;

  constructor() {
    this.hrService = new HRService();
  }

  async approveLeave(req: Request, res: Response) {
    const { leaveId, status } = req.body;
    const leave: Leave = {
      id: leaveId,
      status: status,
    };
    const result = await this.hrService.approveLeave(leave);
    if (result) {
      res.status(200).send({
        message: "Successfully approve employee leave",
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: `Leave ${leaveId} not found`,
        status: res.statusCode,
      });
    }
  }

  async getClockIns(req: Request, res: Response) {
    const result = await this.hrService.getClockIn();
    if (result) {
      res.status(200).send({
        message: "Successfully retrieved employee clock-in data",
        status: res.statusCode,
      });
    } else {
      res.status(404).send({
        message: `Data not found`,
        status: res.statusCode,
      });
    }
  }
}
