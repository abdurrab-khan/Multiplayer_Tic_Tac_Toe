import AllRoom from "./ListAllRooms";
import MyRoom from "./ListOurRooms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function CustomRoomSection() {
  return (
    <TabsContent
      value="custom_room"
      className="mt-5 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
    >
      <Tabs defaultValue="activeRoom" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activeRoom">My Rooms</TabsTrigger>
          <TabsTrigger value="allRooms">All Rooms</TabsTrigger>
        </TabsList>
        <TabsContent value="activeRoom" className="my-3">
          <MyRoom />
        </TabsContent>
        <TabsContent value="allRooms" className="my-3">
          <AllRoom />
        </TabsContent>
      </Tabs>
    </TabsContent>
  );
}

export default CustomRoomSection;
