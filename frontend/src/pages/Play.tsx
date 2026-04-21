import React from "react";
import { useParams } from "react-router-dom";
import OnlineTic from "@/components/Game/OnlineTic";
import OfflineTic from "@/components/Game/OfflineTic";
import SocketProvider from "@/context/SocketProvider";

function Play() {
  const { roomId } = useParams();

  return (
    <React.Fragment>
      {roomId ? (
        <SocketProvider>
          <OnlineTic roomId={roomId} />
        </SocketProvider>
      ) : (
        <OfflineTic />
      )}
    </React.Fragment>
  );
}

export default Play;
