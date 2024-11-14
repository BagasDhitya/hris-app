import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async login(email: string, password: string): Promise<string | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { email: email, password: password },
    });

    if (!employee) {
      throw new Error("Employee not found");
    }

    const token = jwt.sign(
      { id: employee.id, email: employee.email, role: employee.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return token;
  }
}
