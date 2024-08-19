import { getTeamByID } from "@/app/_services/teamServices/getTeamByID";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { slug: string } }) => {
  const teamID = +params.slug.split("-")[1];
  const team = await getTeamByID(teamID).catch(() => {
    notFound();
  });
  if (!team) {
    notFound();
  }

  return <div className="flex  w-full flex-col container ">sdsd</div>;
};

export default Page;
