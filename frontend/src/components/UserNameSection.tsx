import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addUser, updateUser } from "@/lib/action/user.action";
import { useApp } from "@/context/AppProvider";

interface UserNameSectionProps {
  nameDialogOpen: boolean;
  children?: React.ReactNode;
  setNameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserNameSection({
  nameDialogOpen,
  children,
  setNameDialogOpen,
}: UserNameSectionProps) {
  const { user, setUser } = useApp();
  const { toast } = useToast();

  const [inputUserName, setInputUserName] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "error">(
    "idle",
  );

  const username = inputUserName.replace(/\s/g, "_");

  const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const formData = new FormData(e.currentTarget);
      const userName = formData.get("name") as string;

      if (!userName) {
        setFormStatus("error");
        return;
      }

      if (user) {
        const updatedUser = { ...user, userName };
        await updateUser(updatedUser);
        setUser(updatedUser);
      } else {
        const newUser = await addUser({ userName });
        if (newUser) {
          setUser(newUser);
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error?.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setFormStatus("idle");
      setNameDialogOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: username } = e.target;
    const isLimitExceeded = username.trim().length > 6;

    if (isLimitExceeded) {
      if (formStatus !== "error") setFormStatus("error");
    } else {
      if (formStatus === "error") setFormStatus("idle");
      setInputUserName(username);
    }
  };

  useEffect(() => {
    setInputUserName(user?.userName || "");
  }, [user]);

  return (
    <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div>Welcome to Tic Tac Toe</div>
          </DialogTitle>
          <DialogDescription>
            Please enter your name to play the game.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAddUser}>
          <div className="mt-1.5 flex flex-col gap-4">
            <Input
              name="name"
              placeholder="Enter your name"
              value={username}
              onChange={handleInputChange}
            />
            {formStatus === "error" &&
              (username.length === 0 || username.length >= 6) && (
                <span className="text-sm text-white">
                  {username.trim().length >= 6
                    ? "Name should not exceed 6 characters"
                    : "Name is required"}
                </span>
              )}
            <Button size="full" variant="gameBtn" type="submit">
              {user ? "Update Name" : "Save Name"}
              {formStatus === "submitting" && (
                <Loader2 size={24} className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UserNameSection;
