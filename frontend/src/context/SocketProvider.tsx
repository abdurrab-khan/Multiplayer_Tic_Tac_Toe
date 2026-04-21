import { socket } from "@/lib/socket";
import useSocketConnection from "@/hooks/use-socket";
import React, { createContext, useContext } from "react";

interface SocketContextType {
  socket: typeof socket;
}

const SocketContext = createContext<SocketContextType>({
  socket,
});

export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const socket = useSocketConnection();

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
