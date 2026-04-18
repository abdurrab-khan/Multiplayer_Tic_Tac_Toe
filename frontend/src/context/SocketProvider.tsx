import React, { createContext, useEffect, useContext, useRef } from "react";
import { socket } from "@/lib/socket.ts";

import { useApp } from "./AppProvider";
import { useToast } from "@/hooks/use-toast";

interface SocketContextType {
  socket: typeof socket;
  dbRef: React.MutableRefObject<IDBDatabase | null>;
}

const SocketContext = createContext<SocketContextType>({
  socket,
  dbRef: { current: null },
});

export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const { user } = useApp();
  const dbRef = useRef<IDBDatabase | null>(null);

  useEffect(() => {
    if (!socket.connected && user?.userId) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Connected to socket server");
      socket.emit("register", { userId: user?.userId });
    };

    const handleDisconnect = () => {
      console.log("Disconnected from socket server");
    };

    const handleError = (err: Error) => {
      console.error(`Connection error: ${err.message}`);
      toast({
        title: "Connection Error",
        description: `Failed to connect to the server: ${err.message}`,
        variant: "destructive",
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, [toast, user?.userId]);

  return (
    <SocketContext.Provider value={{ socket, dbRef }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
