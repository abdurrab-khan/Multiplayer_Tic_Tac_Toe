import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuickMatch from "../QuickMatchSection";
import CustomRoom from "../Rooms/CustomRoomSection";
import { useApp } from "@/context/AppProvider";
import UserNameSection from "../UserNameSection";

interface JoinRoomProps {
  children?: React.ReactNode;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ children }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openUsernameDialog, setOpenUsernameDialog] = useState(false);

  const { user } = useApp();

  const handleOpenChange = () => {
    if (!user?.userName) {
      setOpenUsernameDialog(true);
      return;
    }
    setOpenDialog((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Dialog open={openDialog} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Room</DialogTitle>
            <DialogDescription>
              Join a room to play with your friends
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="quick_match" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quick_match">Quick Match</TabsTrigger>
              <TabsTrigger value="custom_room">Custom Room</TabsTrigger>
            </TabsList>
            <QuickMatch />
            <CustomRoom />
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* DIALOG TO SET USERNAME IS NOT SET YET */}
      <UserNameSection
        nameDialogOpen={openUsernameDialog}
        setNameDialogOpen={setOpenUsernameDialog}
      />
    </React.Fragment>
  );
};

export default JoinRoom;
