import TeamSettingsNavigation from "../_components/TeamSettingsNavigation";
import TeamSettingsTitle from "../_components/TeamSettingsTitle";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  w-full flex-col container ">
      <main className="flex flex-1 flex-col gap-4  md:gap-8 p-4 md:p-10">
        <div className=" grid w-full max-w-6xl gap-2">
          <TeamSettingsTitle />
        </div>
        <div className=" grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <TeamSettingsNavigation />
          <div className="grid gap-6 ">{children}</div>
        </div>
      </main>
    </div>
  );
}
