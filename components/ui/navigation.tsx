"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Github,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { handleLogout } from "@/app/_actions/handleLogout";
import * as React from "react";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { Dialog, DialogTrigger } from "./dialog";
import { useEffect, useMemo, useState } from "react";
import CreateTeamDialogContent from "../CreateTeamDialogContent";
import { useSocket } from "@/app/context/SocketContext";
import { getUserNotification } from "@/app/_services/notificationServices/getUserNotifications";
import { useUser } from "@/app/context/UserContext";
import { Notification } from "@prisma/client";
import NotificationsList from "../NotificationsList";
const Navigation = () => {
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Your days off",
      href: "/days-off?personal",
      description: "Preview, edit and request your days off",
    },
    {
      title: "Coworkers days off",
      href: "/days-off?coworkers",
      description: "Preview other coworkers days off",
    },
  ];
  const pathname = usePathname();
  const { user } = useUser();
  const { socket } = useSocket();

  const [notificationsList, setNotificationsList] = useState<
    Notification[] | null
  >(null);

  useEffect(() => {
    console.log(user);
    if (user) {
      setNotificationsList(
        user.notifications.filter((notification) => !notification.isRead)
      );
    }
  }, [user]);

  const profileInitials = useMemo(() => {
    if (user && user.name) {
      return user.name
        .split(" ")
        .map((word) => word[0])
        .join("");
    }
    return "";
  }, [user]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (socket) {
      const handleMessage = async (msg) => {
        const notifications = await getUserNotification();
        setNotificationsList(
          notifications.filter((notification) => notification.isRead === true)
        );
      };

      socket.on("notification", handleMessage);

      return () => {
        socket.off("notification", handleMessage);
      };
    }
  }, [socket]);
  return (
    <div className=" flex justify-between py-6 container">
      {" "}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/overview" legacyBehavior passHref>
              <NavigationMenuLink
                active={pathname === "/overview"}
                className={navigationMenuTriggerStyle()}
              >
                Overview
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/reports" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname === "/reports"}
              >
                Reports
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Days off</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[350px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-8 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8 relative"
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
              {notificationsList && notificationsList.length > 0 && (
                <div className="absolute bg-red-500 px-2  rounded-full  text-[10px] flex items-center justify-center -top-3 -right-3 transform origin-right">
                  {notificationsList.length}
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <NotificationsList />
        </DropdownMenu>

        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user && user.image} alt="@shadcn" />
                <AvatarFallback>{profileInitials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link
                    href="/profile"
                    className="w-full h-full flex items-center"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/settings"
                    className="w-full h-full flex items-center"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link
                    href="/teams"
                    className="w-full h-full flex items-center"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <span>Teams</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite users</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Message</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>More...</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <DialogTrigger className="flex">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                  </DialogTrigger>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  className="w-full h-full flex items-center"
                  onClick={() => handleLogout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>

                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <CreateTeamDialogContent
            onIsOpenChange={() => {
              setOpen(!open);
            }}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default Navigation;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
