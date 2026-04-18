import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { getUser } from "@/lib/action/user.action";
import BackgroundMusic from "@/components/BackgroundMusic";

interface AppContextType {
  user: User | null;
  music: boolean;
  setMusic: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = createContext<AppContextType>({
  user: null,
  music: true,
  setUser: () => {},
  setMusic: () => {},
});

export const useApp = () => useContext(AppContext);

function AppProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [music, setMusic] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        toast({
          title: "Error",
          description:
            error instanceof Error ? error?.message : "Something went wrong",
          variant: "destructive",
        });
      }
    })();
  }, [toast]);

  useEffect(() => {
    if (localStorage.getItem("music")) {
      setMusic(JSON.parse(localStorage.getItem("music") as string));
    }
  }, [setMusic]);

  return (
    <AppContext.Provider value={{ user, setUser, music, setMusic }}>
      {children}
      <BackgroundMusic music={music} />
    </AppContext.Provider>
  );
}

export default AppProvider;
