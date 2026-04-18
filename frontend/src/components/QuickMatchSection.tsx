import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

import { TabsContent } from "@/components/ui/tabs";

function QuickMatchSection() {
  const navigate = useNavigate();

  const handleQuickMatch = async () => {
    navigate(
      `/play/${
        Math.random().toString(36).substring(2, 8) +
        Math.random().toString(36).substring(2, 8)
      }`,
    );
  };

  // useEffect(() => {
  //   socket.on("match_found", (roomId) => {
  //     setMatchSearchingDialog(false);
  //     navigate(`/play/${roomId}`);
  //   });

  //   socket.on("emit_joined_into_room", (roomId: string) => {
  //     setMatchSearchingDialog(true);
  //     setRoomId(roomId);
  //   });

  //   socket.on("error", (error: GameError) => {
  //     setMatchSearchingDialog(false);
  //     toast({
  //       title: "Error",
  //       description: error?.message || "An error occurred",
  //       variant: "destructive",
  //     });
  //   });
  // }, [navigate, socket, toast]);

  return (
    <TabsContent value="quick_match" className="mt-5">
      <Button size="full" variant="gameBtn" onClick={handleQuickMatch}>
        Quick Match
        <img src="/icons/quick.svg" alt="quick-match" className="h-9" />
      </Button>
      {/* <SearchingForAnotherPlayer
        dialogOpen={matchSearchingDialog}
        setDialogOpen={setMatchSearchingDialog}
        roomId={roomId || ""}
      /> */}
    </TabsContent>
  );
}

export default QuickMatchSection;
