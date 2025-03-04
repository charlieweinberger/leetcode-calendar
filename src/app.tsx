import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import Settings from "@/components/Settings";

export default function App() {

  const [ username, setUsername ] = useState<string>("");
  const [ year, setYear ] = useState<yearType>(new Date().getUTCFullYear());

  useEffect(() => {
    chrome.storage.sync.get(["username"], (result) => {
      if (result.username) {
        setUsername(result.username);
      }
    });
  }, [username]);

  const updateUsername = (input: string) => {
    const newUsername = input.toLowerCase().trim();
    if (newUsername) {
      chrome.storage.sync.set({ "username": newUsername }, () => {
        setUsername(newUsername);
      });
    }
  };

  const updateYear = (year: yearType) => {
    chrome.storage.sync.set({ "year": year }, () => {
      setYear(year);
    });
  };

  // TODO: Improve the UI of the settings trigger & following modal
  // TODO: Make settings modal appear INSTEAD of the calendar (not as a modal) if the username is empty OR do what is described in lines 38-42 below
  // TODO: Make calendar re-render when username is updated

  if (username === "") {
    // leetcode calendar
    // info about the extension
    // button to insert info
    // when a user clicks this button, show the settings modal, but w/ different text
    // after the user enters their info, render the calendar
  }

  return (
    <div className="h-screen bg-primary-background flex flex-col gap-16 items-center">
      <div className="mt-48 flex flex-col items-center gap-4 text-6xl text-primary-text font-bold">
        Leetcode Calendar for <span className="text-leetcode-orange">{username}</span>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="p-8 bg-secondary-background rounded-xl">
          <Calendar username={username} year={year} />
        </div>
        {/* // TODO consider just moving <Settings /> into app.tsx? */}
        <Settings
          username={username}
          updateUsername={updateUsername}
          year={year}
          updateYear={updateYear}
        />
      </div>
    </div>
  );
}
