import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Dropdown from "@/components/Dropdown";

export default function Settings({
  username,
  year,
  showTitle,
  color,
  loadingUsername,
  updateUsername,
  updateYear,
  updateShowTitle,
  updateColor,
}: {
  username: string;
  year: yearType;
  showTitle: showTitleType;
  color: colorType;
  loadingUsername: boolean;
  updateUsername: (username: string) => void;
  updateYear: (year: yearType) => void;
  updateShowTitle: (showTitle: showTitleType) => void;
  updateColor: (color: colorType) => void;
}) {
  const [open, setOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState(username);
  const [yearInput, setYearInput] = useState<yearType>(year);
  const [showTitleInput, setShowTitleInput] = useState<showTitleType>(showTitle);
  const [colorInput, setColorInput] = useState<colorType>(color);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUsername(usernameInput);
    updateYear(yearInput);
    updateShowTitle(showTitleInput);
    updateColor(colorInput);
    setOpen(false);
  };

  return (
    <Dialog
      open={open || (username === "" && !loadingUsername)}
      onOpenChange={() => setOpen(!open)}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-secondary-background hover:bg-tertiary-background"
        >
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="w-88 p-8 text-primary-text bg-secondary-background rounded-xl border-none">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription className="text-secondary-text">
            Update your Leetcode username and preferred time range.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-[30%_70%] gap-y-4">
            <Label>Username</Label>
            <Input
              defaultValue={username}
              placeholder="username"
              onChange={(e) => setUsernameInput(e.target.value)}
              className="border-none bg-tertiary-background hover:bg-quaternary-background active:bg-quaternary-background selection:bg-leetcode-orange"
            />
            <Label>Year Type</Label>
            <Dropdown
              options={["Year to Date", "Previous 365 Days"]}
              input={yearInput}
              setInput={setYearInput}
              width={"w-46"}
            />
            <Label>Show Title</Label>
            <Dropdown
              options={["Yes", "No"]}
              input={showTitleInput}
              setInput={setShowTitleInput}
              width={"w-46"}
            />
            <Label>Color</Label>
            <Dropdown
              options={["Green", "Orange"]}
              input={colorInput}
              setInput={setColorInput}
              width={"w-46"}
            />
          </div>
          <Button
            type="submit"
            className="bg-leetcode-orange hover:bg-leetcode-orange/80 font-bold"
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
