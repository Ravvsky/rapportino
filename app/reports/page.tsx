"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
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
import { useState } from "react";

const Page = () => {
  const [date, setdate] = useState(new Date());

  const month = date.getMonth();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthString = date.toLocaleString("default", { month: "long" }); // Get full month name
  const year = date.getFullYear();
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
  const handleNextMonth = () => {
    const nextMonthDate = new Date(year, date.getMonth() + 1, 1);
    setdate(nextMonthDate);
  };
  const handlePreviousMonth = () => {
    const nextMonthDate = new Date(year, date.getMonth() - 1, 1);
    setdate(nextMonthDate);
  };
  return (
    <div className="container flex flex-col gap-6">
      <p className="text-3xl font-medium">
        {" "}
        {monthString} {year}
      </p>
      <div className="flex justify-between">
        <div className="text-xl font-medium">Worked hours: 168</div>
        <div className="flex gap-4">
          {" "}
          <Button type="button" variant="outline" onClick={handlePreviousMonth}>
            Previous month
          </Button>
          <Button type="button" variant="outline" onClick={handleNextMonth}>
            Next month
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[5%]">Day</TableHead>
            <TableHead className="w-[10%]">Worked hours</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="ht">Category</TableHead>
          </TableRow>
        </TableHeader>
        {daysArray.map((day, index) => {
          return (
            <TableBody key={index}>
              <TableRow className={day.isWeekend ? "bg-muted" : ""}>
                <TableCell className="font-medium w-[5%]">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </TableCell>
                <TableCell>
                  <Input type="text" />
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
  );
};
export default Page;
