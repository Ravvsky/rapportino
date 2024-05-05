import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container flex flex-col gap-6">
      <Skeleton className="text-3xl font-medium text-transparent w-fit">
        November 2024
      </Skeleton>
      <div className="flex justify-between">
        <Skeleton className="text-xl font-medium text-transparent">
          Worked hours: 168
        </Skeleton>
        <div className="flex gap-4">
          <Skeleton>
            <Button variant={"secondary"} className="text-transparent">
              Previous month
            </Button>
          </Skeleton>
          <Skeleton>
            <Button variant={"secondary"} className="text-transparent">
              Next month
            </Button>
          </Skeleton>
        </div>
      </div>
      <Skeleton className="w-full h-[48px]" />
      <div className="flex flex-col gap-8">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <Skeleton className="w-full h-[72px]" key={index} />
          ))}
      </div>
    </div>
  );
}
