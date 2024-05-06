"use client";

import { usePathname } from "next/navigation";

const SettingsTitle = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const settingsTitle = pathnameParts[pathnameParts.length - 1];
  return <h1 className="text-3xl font-semibold capitalize">{settingsTitle}</h1>;
};
export default SettingsTitle;
