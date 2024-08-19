import React from "react";
import { Html, Button, Container, Heading } from "@react-email/components";

const InviteToTeam = ({
  ownerEmail,
  teamName,
  encodedURLPart,
}: {
  ownerEmail: string;
  teamName: string;
  encodedURLPart: string;
}) => {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://rapportino.com/";
  return (
    <Html lang="en" dir="ltr">
      <Container>
        <Heading>
          {ownerEmail} has invited you to team: {teamName}
        </Heading>
        <Button
          href={`${baseURL}join-team/${encodedURLPart}`}
          style={{ color: "#61dafb" }}
        >
          Click me
        </Button>
      </Container>
    </Html>
  );
};

export default InviteToTeam;
