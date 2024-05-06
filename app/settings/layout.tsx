import SettingsTitle from "@/components/SettingsTitle";
import SettingsNavigation from "@/components/SettingsNavigation";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-full flex-col container ">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4  md:gap-8 p-4 md:p-10">
        <div className=" grid w-full max-w-6xl gap-2">
          <SettingsTitle />
        </div>
        <div className=" grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <SettingsNavigation />
          <div className="grid gap-6 ">{children}</div>
        </div>
      </main>
      <Toaster />
    </div>
  );
};
export default Layout;
