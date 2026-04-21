import { useEffect } from "react";
import { useToast } from "./use-toast";
import { useApp } from "@/context/AppProvider";
import { socket } from "@/lib/socket";
import { useParams } from "react-router-dom";

function useSocketConnection() {
  const { user } = useApp();
  const { toast } = useToast();
  const { roomId } = useParams();

  useEffect(() => {
    if (!user?.userId || !roomId) return;

    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Connected to socket server");
      socket.emit("register", { userId: user.userId });

      // Connect to the room if roomId is available
      socket.emit("join_room", { roomId });
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
      socket.disconnect(); // Ensure we disconnect when the component unmounts or user changes
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleError);
    };
  }, [roomId, toast, user?.userId]);

  return socket;
}

export default useSocketConnection;
