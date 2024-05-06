"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNavigation = () => {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const settingsTitle = pathnameParts[pathnameParts.length - 1];
  const links = [
    { href: "/settings", text: "General" },
    { href: "/settings/security", text: "Security" },
    { href: "#", text: "Integrations" },
    { href: "#", text: "Support" },
    { href: "#", text: "Organizations" },
    { href: "#", text: "Advanced" },
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

export default SettingsNavigation;
