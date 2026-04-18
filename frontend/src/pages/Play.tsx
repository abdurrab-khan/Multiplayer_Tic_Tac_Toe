import OfflineTic from "@/components/Game/OfflineTic";
import OnlineTic from "@/components/Game/OnlineTic";
import RoomProvider from "@/context/RoomContext";
import SocketProvider from "@/context/SocketProvider";

function Play() {
  const roomId = window.location.pathname.split("/").pop();

  return (
    <SocketProvider>
      <RoomProvider>
        {roomId && roomId.startsWith("room") ? <OnlineTic /> : <OfflineTic />}
      </RoomProvider>
    </SocketProvider>
  );
}

export default Play;
