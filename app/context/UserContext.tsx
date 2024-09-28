"use client";
import { createContext, useContext, useEffect, useState } from "react";
import getLoggedUserID from "../_actions/getLoggedUserID";
import { getUserByID } from "../_services/userServices/getUserByID";
import { User } from "@prisma/client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const userID = await getLoggedUserID();
    const fetchedUser = await getUserByID(userID);
    setUser(fetchedUser);
  };

  const refetchUser = () => {
    fetchUser();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
