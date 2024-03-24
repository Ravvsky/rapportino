import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Page = () => {
  // <div className="pt-6 pb-4">Planned days off</div>
  // <CardDescription>
  //   You have not planned any days off
  // </CardDescription>
  return (
    <div className="container grid grid-cols-3 gap-4">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>This month</CardTitle>
          <CardDescription>Quick summary of this month</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <Card className="col-span-1">
            <CardHeader>
              <h2>Worked hours</h2>
            </CardHeader>
            <CardContent>
              <CardTitle>168 hours in 21 days</CardTitle>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                <CarouselItem>
                  <CardHeader>
                    <h2>Gross earnings</h2>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>1868.16 €</CardTitle>
                  </CardContent>
                </CarouselItem>

                <CarouselItem>
                  <CardHeader>
                    <h2>Estimated net earnings</h2>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>1307.71 €</CardTitle>
                  </CardContent>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="-left-0 border-0" />
              <CarouselNext className="-right-0 border-0" />
            </Carousel>
          </Card>

          <Card className="col-span-1">
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                <CarouselItem>
                  <CardHeader>
                    <div className="">Available days off</div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>12</CardTitle>
                  </CardContent>
                </CarouselItem>

                <CarouselItem>
                  {" "}
                  <CardHeader>
                    <div className="">Planned days off</div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>You have no planned days off</CardTitle>
                  </CardContent>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="-left-0 border-0" />
              <CarouselNext className="-right-0 border-0" />
            </Carousel>
          </Card>
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Previous months</CardTitle>
          <CardDescription>Quick summary of this month</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Worked hours</TableHead>
                <TableHead>Status</TableHead>

                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">March</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">February</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">January</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">December</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-center">$250.00</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
