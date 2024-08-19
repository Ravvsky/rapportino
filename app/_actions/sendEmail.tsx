"use server";
import nodemailer from "nodemailer";
import { getUserByID } from "../_services/userServices/getUserByID";
import { render } from "@react-email/render";
import InviteToTeam from "@/components/email-templates/InviteToTeam";
import { getTeamByID } from "../_services/teamServices/getTeamByID";
import { simpleEncrypt } from "../_utils/crypto";
import { getUserByEmail } from "../_services/userServices/getUserByEmail";

const sendEmail = async (
  teamID: number,
  ownerID: string,
  invitedUserEmail: string
) => {
  const isInvitedUserExists = await getUserByEmail(invitedUserEmail);
  if (!isInvitedUserExists) return false;
  console.log(process.env.SMTP_EMAIL);
  console.log(process.env.SMTP_PASSWORD);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  const ownerEmail = await getUserByID(ownerID);
  const team = await getTeamByID(teamID);
  const dataToEncode = { ownerEmail: ownerEmail, teamID: teamID };

  const encoded = await simpleEncrypt(JSON.stringify(dataToEncode));
  //
  if (ownerEmail?.name && team?.name) {
    const emailHtml = render(
      <InviteToTeam
        ownerEmail={ownerEmail?.name}
        teamName={team?.name}
        encodedURLPart={encoded}
      />
    );
    var message = {
      from: "sender@server.com",
      to: "pawel.rawsk@gmail.com",
      subject: "Message title",
      text: "Plaintext version of the message",
      html: emailHtml,
    };

    transporter
      .sendMail(message)
      .then((res) => console.log("res"))
      .catch((er) => {
        console.log(er);
      });
  }

  return true;
};

export default sendEmail;
