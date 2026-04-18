import JoinRoom from "@/components/Rooms/JoinRoom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNameSection from "@/components/UserNameSection";
import { useApp } from "@/context/AppProvider";
import Score from "@/components/Score";
import MusicButton from "@/components/MusicButton";

function Home() {
  const [nameDialogOpen, setNameDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useApp();

  const handlePlayWithFriends = () => {
    if (!user?.userName) {
      setNameDialogOpen(true);
    } else {
      navigate("/play");
    }
  };

  return (
    <div className="home_menu">
      <div className={"home_menu_card"}>
        <div className="home_menu_card_bg flex justify-center">
          <img src="/images/tic-tac-toe-image.png" alt="bg" className="h-3/4" />
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-6">
            <UserNameSection
              nameDialogOpen={nameDialogOpen}
              setNameDialogOpen={setNameDialogOpen}
            >
              <Button variant={"roundedBtn"} size={"roundedBtn"}>
                <img src="/icons/edit-profile.svg" alt="avatar" />
              </Button>
            </UserNameSection>
            <Score />
          </div>
          <MusicButton />
        </div>
        <div className="mb-20 flex h-full w-full flex-col justify-end gap-3">
          <Button
            size={"full"}
            variant={"gameBtn"}
            onClick={handlePlayWithFriends}
          >
            Play with
            <img src="/icons/users.svg" alt="friends" className="h-9" />
          </Button>
          <JoinRoom>
            <Button size={"full"} variant={"gameBtn"}>
              Play with
              <img src="/icons/internet.svg" alt="laptop" className="h-9" />
            </Button>
          </JoinRoom>
        </div>
      </div>
    </div>
  );
}

export default Home;
