import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const data = await this.authService.login(email, password);
      res.status(200).send({
        data: data,
        message: "Successfully logged in",
        status: res.statusCode,
      });
    } catch (error) {
      res.status(404).send({
        message: "Failed to log in. Check your email or password",
        status: res.statusCode,
        details: error,
      });
    }
  }
}
