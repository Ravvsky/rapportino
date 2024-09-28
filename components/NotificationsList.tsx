"use client";

import { useUser } from "@/app/context/UserContext";
import { DropdownMenuContent, DropdownMenuLabel } from "./ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import changeNotificationStatus from "@/app/_services/notificationServices/changeNotificationStatus";
import Link from "next/link";
import removeNotification from "@/app/_services/notificationServices/removeNotification";

const NotificationsList = () => {
  const { user } = useUser();
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <DropdownMenuContent className="w-[23.3rem] py-5" align={"end"}>
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      {!user && (
        <div className="flex flex-col ml-2 gap-5 py-5 ">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[350px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </div>
      )}
      {user && user.notifications.length === 0 && (
        <div className="flex justify-center flex-col items-center py-10 gap-10">
          <Bell className="h-36 w-36" strokeWidth={0.5} />
          <p className="text-semibold font-semibold">
            You will find your notifications here
          </p>
        </div>
      )}
      {user && user.notifications.length > 0 && (
        <ScrollArea className="flex justify-center flex-col items-center max-h-[245px]  ">
          {user.notifications.map((notification, i) => (
            <NotificationItem
              key={i}
              url={notification.url}
              title={notification.title}
              description={notification.description}
              isRead={notification.isRead}
              id={notification.id}
            />
          ))}
        </ScrollArea>
      )}
    </DropdownMenuContent>
  );
};

export default NotificationsList;

const NotificationItem = ({ url, title, description, isRead, id }) => {
  const { refetchUser } = useUser();

  return (
    <Link
      href={url}
      className={`w-full block select-nonerounded-md p-3 leading-none no-underline outline-none transition-colors ${
        !isRead && "bg-accent hover:bg-transparent"
      } hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`}
      onClick={async () => {
        await changeNotificationStatus(id);
        refetchUser();
      }}
    >
      <div className="flex justify-between">
        <div className=" space-y-1 ">
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </div>
        <div
          className="text-xs rounded-md hover:bg-ring transition-all font-bold h-min p-1"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            removeNotification(id);
            refetchUser();
          }}
        >
          X
        </div>
      </div>
    </Link>
  );
};
