import { PrismaClient } from "@prisma/client";
import { Leave } from "../models/models";

export class HRService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async approveLeave(data: Leave) {
    const leave: Leave = {
      id: data.id,
      status: data.status,
    };
    return await this.prisma.leave.update({
      where: { id: leave.id },
      data: {
        status: leave.status,
      },
    });
  }

  async getClockIn() {
    return await this.prisma.clockIn.findMany();
  }
}
