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
      const token = await this.authService.login(email, password);
      console.log("token : ", token);
      res.status(200).send({
        message: "Successfully logged in",
        status: res.statusCode,
        access_token: token,
      });
    } catch (error) {
      const errorDetails = {
        name: error instanceof Error ? error.name : "UnknownError",
        detail:
          error instanceof Error ? error.message : "An unknown error occurred",
      };
      console.log("track error : ", errorDetails);
      res.status(404).send({
        message: "Failed to log in. Check your email or password",
        status: res.statusCode,
        details: errorDetails,
      });
    }
  }
}
