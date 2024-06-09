"use client";

import { usePathname } from "next/navigation";

const TeamSettingsTitle = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const teamName = pathnameParts[2].split("-")[0];
  return <h1 className="text-3xl font-semibold capitalize">{teamName}</h1>;
};
export default TeamSettingsTitle;
