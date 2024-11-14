import express from "express";
import employeeRouter from "./routers/employee.router";
import hrRouter from "./routers/hr.router";
import authRouter from "./routers/auth.router";

const app = express();
const port = 8000;

app.use(express.json());
app.use("/api/employee", employeeRouter);
app.use("/api/human-resource", hrRouter);
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log("listening on port : ", port);
});
