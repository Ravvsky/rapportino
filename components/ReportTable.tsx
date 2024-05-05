"use client";
import upsertReport from "@/app/_services/upsertReport";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ReportTable = ({
  userID,
  year,
  month,
  monthName,
  dayOfMonth,
  workedHours,
}: {
  userID: number;
  year: number;
  month: number;
  monthName: string;
  dayOfMonth: number;
  workedHours: number;
}) => {
  const [value, setValue] = useState(workedHours); // State to store the input value
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => setValue(+e.target.value)}
      onBlur={async (e) => {
        upsertReport(
          userID,
          year,
          month,
          monthName,
          +e.target.value,
          dayOfMonth
        );
      }}
    />
  );
};

export default ReportTable;
