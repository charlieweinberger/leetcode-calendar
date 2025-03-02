import { useState, useEffect } from "react";
import CalendarContainer from "@src/components/CalendarContainer";

export default function Newtab() {

  const [ textInput, setTextInput ] = useState<string>("");
  const [ username, setUsername ] = useState<string>("");

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

  if (!username) {
    return (
      <div className="h-screen bg-primary-background flex flex-col gap-16 items-center">
        <div className="mt-48 flex flex-col items-center gap-4 text-6xl text-primary-text font-bold">
          Leetcode Calendar
        </div>
        <div className="flex flex-col gap-6 items-center">
          <input
            type="text"
            className="w-72 px-4 py-3 rounded-xl border border-leetcode-orange text-primary-text text-lg active:outline-leetcode-orange focus:outline-leetcode-orange"
            placeholder="Enter your Leetcode username"
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button
            className="w-28 px-4 py-3 rounded-xl bg-leetcode-orange hover:bg-leetcode-orange/80 transition text-secondary-background text-lg font-bold"
            onClick={() => updateUsername(textInput)}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-primary-background flex flex-col gap-16 items-center">
      <div className="mt-48 flex flex-col items-center gap-4 text-6xl text-primary-text font-bold">
        Leetcode Calendar for <span className="text-leetcode-orange">{username}</span>
      </div>
      <CalendarContainer username={username} />
    </div>
  );
}
