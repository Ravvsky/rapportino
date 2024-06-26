"use server";
import { revalidatePath } from "next/cache";
import prisma from "../_utils/prisma";

const upsertReport = async (
  userId: string,
  year: number,
  month: number,
  monthName: string,
  workedHours: number,
  dayofMonth: number
) => {
  await prisma.report.upsert({
    where: {
      userId_date: {
        userId: userId,
        date: new Date(Date.UTC(year, month, dayofMonth)),
      },
    },
    update: {
      workedHours: workedHours,
    },
    create: {
      userId: userId,
      workedHours: workedHours,
      date: new Date(Date.UTC(year, month, dayofMonth)),
    },
  });
  revalidatePath(`/reports/${monthName}/${year}`);
};

export default upsertReport;
