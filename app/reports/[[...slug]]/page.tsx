import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import ReportTable from "@/components/ReportTable";
import getLoggedUserID from "@/app/_actions/getLoggedUserID";
import PrismaSingleton from "@/app/_utils/prisma";
import prisma from "@/app/_utils/prisma";

const Page = async ({ params }: { params: { slug: string } }) => {
  const user = await getLoggedUserID();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  const monthIndex = months.indexOf(params?.slug?.[0]);
  const month = monthIndex !== -1 ? monthIndex : date.getMonth();

  const year =
    params && params.slug && params.slug[1]
      ? +params.slug[1]
      : date.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
    const currentDate = new Date(year, month, index + 1);
    const dayOfWeek = days[currentDate.getDay()];
    return {
      dayOfMonth: index + 1,
      dayOfWeek: dayOfWeek,
      isWeekend: dayOfWeek === "Saturday" || dayOfWeek === "Sunday",
    };
  });

  const previousMonthIndex = month === 0 ? 11 : month - 1;
  const previousYear = month === 0 ? year - 1 : year;
  const previousMonthString = months[previousMonthIndex];

  const nextMonthIndex = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const nextMonthString = months[nextMonthIndex];

  const userReport = await prisma.report.findMany({
    where: {
      AND: [
        { userId: user },
        {
          date: {
            gte: new Date(Date.UTC(year, month, 1)),
            lte: new Date(Date.UTC(year, month + 1, 0)),
          },
        },
      ],
    },
  });
  return (
    <div className="container flex flex-col gap-6 py-4 md:py-10">
      <h1 className="text-3xl font-semibold px-4 md:px-10">
        {months[month]} {year}
      </h1>
      <div className="flex justify-between px-4 md:px-10">
        <div className="text-xl font-medium">Worked hours: 168</div>
        <div className="flex gap-4">
          {" "}
          <Link
            href={`/reports/${previousMonthString}/${previousYear}`}
            prefetch={false}
          >
            <Button variant={"outline"}>Previous month</Button>
          </Link>
          <Link
            href={`/reports/${nextMonthString}/${nextYear}`}
            prefetch={false}
          >
            <Button variant={"outline"}>Next month</Button>
          </Link>
        </div>
      </div>
      <div className="px-4 md:px-10">
        <Table className=" px-4 md:px-10">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[5%]">Day</TableHead>
              <TableHead className="w-[10%]">Worked hours</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="ht">Category</TableHead>
            </TableRow>
          </TableHeader>
          {daysArray.map((day, index) => {
            const matchingDay = userReport.find((item) => {
              const date = new Date(item.date);
              return date.getDate() === index + 1;
            });

            return (
              <TableBody key={index}>
                <TableRow className={day.isWeekend ? "bg-muted" : ""}>
                  <TableCell className="font-medium w-[5%]">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </TableCell>
                  <TableCell>
                    <ReportTable
                      userID={user}
                      year={year}
                      month={month}
                      dayOfMonth={index + 1}
                      workedHours={matchingDay ? matchingDay.workedHours : 0}
                      monthName={months[month]}
                    />
                  </TableCell>
                  <TableCell className="w-[70%]">
                    <Input type="text" />
                  </TableCell>
                  <TableCell className=" text-right">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Features</SelectItem>
                        <SelectItem value="dark">Fix</SelectItem>
                        <SelectItem value="system">Legacy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </div>
    </div>
  );
};
export default Page;
