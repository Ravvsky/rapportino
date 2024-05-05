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

const Page = ({ params }: { params: { slug: string } }) => {
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
  console.log(year);
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
  return (
    <div className="container flex flex-col gap-6">
      <p className="text-3xl font-medium">
        {months[month]} {year}
      </p>
      <div className="flex justify-between">
        <div className="text-xl font-medium">Worked hours: 168</div>
        <div className="flex gap-4">
          {" "}
          <Link href={`/reports/${previousMonthString}/${previousYear}`}>
            <Button variant={"outline"}>Previous month</Button>
          </Link>
          <Link href={`/reports/${nextMonthString}/${nextYear}`}>
            <Button variant={"outline"}>Next month</Button>
          </Link>
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