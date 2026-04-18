import { useEffect, useState } from "react";
import { Room } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import RoomElem from "./RoomElem";
import CreateRoom from "./CreateRoom";
import NotAvailable from "./NotAvailable";
import { AxiosError } from "axios";
import { getAllRoom } from "@/lib/action/room.action";
import { useToast } from "@/hooks/use-toast";

function ListAllRooms() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getAllRoom()
      .then((res) => {
        if (res?.status !== "success") {
          throw new Error(res?.message);
        }
        setRooms(res.data);
      })
      .catch((err) => {
        const errorMessage =
          err instanceof Error
            ? err.message
            : err instanceof AxiosError
              ? err.response?.data.message
              : "An error occurred";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [toast]);

  return (
    <ScrollArea className={`${rooms.length > 0 ? "h-[200px]" : ""} min-h-52`}>
      <Card className="w-full border-none bg-custom-blue text-white outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0">
        <CardHeader className="px-4 pb-2 pt-4">
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">All Rooms</div>
              <CreateRoom setRooms={setRooms} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-2">
          <div className="flex flex-col gap-2">
            {loading ? (
              <div className="flex h-20 items-center justify-center">
                <span className="text-sm text-gray-400">Loading...</span>
              </div>
            ) : rooms.length > 0 ? (
              rooms.map((rm, index) => <RoomElem key={index} room={rm} />)
            ) : (
              <NotAvailable />
            )}
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}

export default ListAllRooms;
