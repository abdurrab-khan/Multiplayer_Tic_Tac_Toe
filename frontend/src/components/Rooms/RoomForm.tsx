import React from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ENTER_BTN_ROOM_TEXT } from "@/lib/constants";

interface RoomFormProps {
  handleRoomSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: boolean;
  btnText?: string;
  header?: string;
  roomPassword?: string;
}

function RoomForm({
  handleRoomSubmit,
  onSubmit,
  roomName,
  setRoomName,
  btnText,
  header,
  roomPassword,
}: RoomFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length <= 10) {
      setRoomName(value);
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-lg font-semibold">{header}</h1>
      <form onSubmit={handleRoomSubmit}>
        <div className="mt-1.5 flex flex-col gap-4">
          <Input
            name="roomName"
            placeholder="Enter room name"
            maxLength={10}
            value={roomName}
            onChange={handleInputChange}
          />
          {((roomPassword && btnText === ENTER_BTN_ROOM_TEXT) ||
            btnText === "Create Room") && (
            <Input
              type="password"
              name="password"
              placeholder="Enter room password"
            />
          )}
          <Button size="full" variant="gameBtn" type="submit">
            {btnText}
            {onSubmit ? (
              <Loader2 size={24} className="animate-spin" />
            ) : (
              <img src="/icons/create.svg" alt="plus" className="h-8" />
            )}
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default RoomForm;
