import express from "express";
import employeeRouter from "./routers/employee.routers";
import hrRouter from "./routers/hr.routers";

const app = express();
const port = 8000;

app.use(express.json());
app.use("/api/employee", employeeRouter);
app.use("/api/human-resource", hrRouter);
app.listen(port, () => {
  console.log("listening on port : ", port);
});
