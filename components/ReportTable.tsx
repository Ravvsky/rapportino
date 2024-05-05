"use client";
import upsertReport from "@/app/_services/upsertReport";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ReportTable = ({
  year,
  month,
  monthName,
  dayOfMonth,
  workedHours,
}: {
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
        upsertReport(1, year, month, monthName, +e.target.value, dayOfMonth);
      }}
    />
  );
};

export default ReportTable;
