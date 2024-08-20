"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TeamSettingsNavigation = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const settingsTitle = pathnameParts[pathnameParts.length - 1];
  const teamUrl = pathname.split("/")[2];
  const links = [
    { href: `/teams/${teamUrl}`, text: "General" },
    { href: `/teams/${teamUrl}/members`, text: "Members" },
    { href: "#", text: "Reports" },
    { href: "#", text: "Resources" },
  ];

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`hover:text-primary hover:font-semibold ${
            settingsTitle === link.href.split("/").pop()
              ? "text-primary font-semibold"
              : ""
          }`}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
};

export default TeamSettingsNavigation;
