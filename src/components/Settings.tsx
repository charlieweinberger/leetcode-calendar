import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function YearDropdown({ yearInput, setYearInput }: {
  yearInput: string,
  setYearInput: (yearInput: string) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{yearInput}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={yearInput} onValueChange={setYearInput}>
          <DropdownMenuRadioItem value="prev">Previous Year</DropdownMenuRadioItem>
          {/* // TODO: add proper years here, depending on the user's account age */}
          <DropdownMenuRadioItem value="2025">2025</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Settings({ username, updateUsername, year, updateYear }: {
  username: string,
  updateUsername: (username: string) => void,
  year: yearType,
  updateYear: (year: yearType) => void
}) {

  const [ open, setOpen ] = useState(username === "");
  const [ usernameInput, setUsernameInput ] = useState<string>(username ?? "username");
  const [ yearInput, setYearInput ] = useState<string>(year.toString());

  const handleSubmit = () => {
    updateSettings();
  };

  const updateSettings = () => {
    updateUsername(usernameInput);
    const newYear: yearType = (yearInput === "prev") ? "prev" : parseInt(yearInput);
    updateYear(newYear);
  }

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DialogTrigger>
      <DialogContent className="p-8 text-primary-text bg-secondary-background rounded-xl border-tertiary-background">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription className="text-secondary-text">
            Update your Leetcode username and preferred time range.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <Label htmlFor="name">Username</Label>
            <Input
              id="username"
              defaultValue={username}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-row gap-2">
            <Label htmlFor="username">Year</Label>
            <YearDropdown yearInput={yearInput} setYearInput={setYearInput} />
          </div>
        </div>
        <DialogFooter className="border-red-500">
          <div className="flex justify-center border-blue-500">
            <Button
              type="submit"
              className="bg-leetcode-orange hover:bg-leetcode-orange/80 font-bold"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
