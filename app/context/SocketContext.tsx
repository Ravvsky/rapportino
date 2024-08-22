"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import getLoggedUserID from "../_actions/getLoggedUserID";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const fetchUserID = async () => {
      const id = await getLoggedUserID();
      setUserId(id);
    };

    fetchUserID();
  }, []);
  const socketRef = useRef(null);

  useEffect(() => {
    if (userId) {
      socketRef.current = io(`localhost:3001`, {
        query: { userId: userId },
      });
      const socket = socketRef.current;

      setSocket(socket);

      socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("joinRoom", userId);
      });
      socket.on("message", (msg) => {
        console.log("Message from server:", msg);
      });
      socket.on("notification", (msg) => {
        console.log("Message from server:", msg);
      });
      return () => {
        socket.off("message");
        socket.off("notification");
        socket.disconnect();
      };
    }
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
