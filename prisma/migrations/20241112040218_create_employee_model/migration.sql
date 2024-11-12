-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "employee";

-- CreateEnum
CREATE TYPE "employee"."Role" AS ENUM ('HR', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "employee"."LeaveType" AS ENUM ('ANNUAL', 'SICK', 'MATERNITY');

-- CreateEnum
CREATE TYPE "employee"."LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "employee"."Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "employee"."Role" NOT NULL DEFAULT 'EMPLOYEE',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee"."ClockIn" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "clockInTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clockOutTime" TIMESTAMP(3),

    CONSTRAINT "ClockIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee"."Leave" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "leaveType" "employee"."LeaveType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "employee"."LeaveStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "employee"."Employee"("email");

-- AddForeignKey
ALTER TABLE "employee"."ClockIn" ADD CONSTRAINT "ClockIn_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee"."Leave" ADD CONSTRAINT "Leave_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee"."Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
