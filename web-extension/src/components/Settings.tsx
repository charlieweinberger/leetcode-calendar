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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";

function YearDropdown({ options, yearInput, setYearInput }: {
  options: yearType[]
  yearInput: yearType
  setYearInput: (yearInput: yearType) => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="bg-tertiary-background hover:bg-quaternary-background active:bg-quaternary-background font-normal">
        <Button className="flex flex-row justify-between">
          {yearInput}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-tertiary-background text-primary-text p-2">
        <DropdownMenuRadioGroup
          value={yearInput}
          onValueChange={(value: string) => setYearInput(value as yearType)}
          className="w-42 border-none flex flex-col gap-1"
        >
          {options.map((option: string) => {
            return <DropdownMenuRadioItem
              key={option}
              value={option}
              className={`${option === yearInput ? "bg-quaternary-background" : ""} focus:bg-quaternary-background active:bg-quaternary-background`}
            >
              {option}
            </DropdownMenuRadioItem>
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Settings({ username, year, loadingUsername, updateUsername, updateYear, updateCalendar }: {
  username: string
  year: yearType
  loadingUsername: boolean
  updateUsername: (username: string) => void
  updateYear: (year: yearType) => void
  updateCalendar: (usernameInput: string, newYear: yearType) => void
}) {

  const [ open, setOpen ] = useState(false);
  const [ usernameInput, setUsernameInput ] = useState<string>(username);
  const [ yearInput, setYearInput ] = useState<yearType>(year);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update username, year, and calendar
    updateUsername(usernameInput);
    updateYear(yearInput);
    updateCalendar(usernameInput, yearInput);
    // reset variables
    setOpen(false);
  };

  return (
    <Dialog open={open || (username === "" && !loadingUsername)} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-secondary-background hover:bg-tertiary-background"
        >
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="w-80 p-8 text-primary-text bg-secondary-background rounded-xl border-none">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription className="text-secondary-text">
            Update your Leetcode username and preferred time range.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-[33%_67%] gap-y-4">
            <Label>Username</Label>
            <Input
              defaultValue={username}
              placeholder="username"
              onChange={(e) => setUsernameInput(e.target.value)}
              className="border-none bg-tertiary-background hover:bg-quaternary-background active:bg-quaternary-background selection:bg-leetcode-orange"
            />
            <Label>Year Type</Label>
            <YearDropdown
              options={["Year to Date", "Previous 365 Days"]}
              yearInput={yearInput}
              setYearInput={setYearInput}
            />
          </div>
          <Button type="submit" className="bg-leetcode-orange hover:bg-leetcode-orange/80 font-bold">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
