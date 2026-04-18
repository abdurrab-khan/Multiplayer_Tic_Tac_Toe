import React from "react";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Room } from "@/types";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function RoomElem({ room }: { room: Room }) {
  const { roomId, roomName, password, type } = room;

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEnterRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enteredPassword = formData.get("password") as string;

    if (type === "private") {
      const isCorrectPassword = password === (enteredPassword || "");

      if (!isCorrectPassword) {
        toast({
          title: "Error",
          description: "Invalid password",
          variant: "destructive",
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "Password is correct! Entering room...",
        });
      }
    }

    navigate(`/play/${roomId}`);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="group w-full cursor-pointer select-none">
          <div className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <img src={`/icons/${type}.svg`} alt="room" className="h-6" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-balance text-sm font-bold text-white">
                  {roomName}
                </h3>
                <p className="text-xs text-purple-100">
                  {type === "public" ? "Public Room" : "Private Room"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                <Users className="mr-1 h-3 w-3" />
              </Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleEnterRoom}>
          <h1>Enter room</h1>
          <div className="mt-1.5 flex flex-col gap-4">
            <Input
              name="roomName"
              disabled
              placeholder="Enter room name"
              value={roomName}
            />
            {type === "private" && (
              <Input
                type="password"
                name="password"
                placeholder="Enter room password"
              />
            )}
            <Button size="full" variant="gameBtn" type="submit">
              <img src="/icons/create.svg" alt="plus" className="h-8" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RoomElem;
