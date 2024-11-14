import express from "express";
import employeeRouter from "./routers/employee.router";
import hrRouter from "./routers/hr.router";
import authRouter from "./routers/auth.router";
import cors from "cors";

import { ErrorHandler } from "./middlewares/error.middleware";

const app = express();
const errorHandler = new ErrorHandler();
const port = 8000;

app.use(
  cors({
    origin: "https://localhost:3000",
  })
);

app.use(express.json());
app.use("/api/employee", employeeRouter);
app.use("/api/human-resource", hrRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler.handleError.bind(errorHandler));
app.listen(port, () => {
  console.log("listening on port : ", port);
});
