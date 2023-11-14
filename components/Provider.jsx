"use client";

import { BioFormContextProvider } from "@app/context/BioProvider";
import { SessionProvider } from "next-auth/react";
const Provider = ({ children, session }) => {
  return (
    <BioFormContextProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </BioFormContextProvider>
  );
};

export default Provider;
