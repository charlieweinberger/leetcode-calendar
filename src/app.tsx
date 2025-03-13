import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import Settings from "@/components/Settings";
import Feedback from "@/components/Feedback";

export default function App() {

  const [ username, setUsername ] = useState("");
  const [ year, setYear ] = useState<yearType>("Previous 365 Days");
  const [ showTitle, setShowTitle ] = useState<showTitleType>("Yes");
  const [ loadingUsername, setLoadingUsername ] = useState(true);

  // Get username from storage
  useEffect(() => {
    chrome.storage.sync.get(["username"], (result) => {
      setUsername(result.username ?? username);
      setLoadingUsername(false);
    });
  }, [username]);

  // Update username in storage
  const updateUsername = (input: string) => {
    const newUsername = input.toLowerCase().trim();
    if (!newUsername) return;
    chrome.storage.sync.set({ "username": newUsername }, () => setUsername(newUsername));
  };

  // Get year from storage
  useEffect(() => {
    chrome.storage.sync.get(["year"], (result) => setYear(result.year ?? year));
  }, [year]);

  // Update year in storage
  const updateYear = (newYear: yearType) => {
    chrome.storage.sync.set({ "year": newYear }, () => setYear(newYear));
  };

  // Get showTitle from storage
  useEffect(() => {
    chrome.storage.sync.get(["showTitle"], (result) => setShowTitle(result.showTitle ?? showTitle));
  }, [showTitle]);

  // Update showTitle in storage
  const updateShowTitle = (showTitle: showTitleType) => {
    chrome.storage.sync.set({ "showTitle": showTitle }, () => setShowTitle(showTitle));
  };

  return (
    <div className="h-screen bg-primary-background flex flex-col justify-center items-center gap-12">
      {(showTitle === "Yes") && <div className="px-8 flex flex-col items-center justify-center gap-2 text-6xl text-primary-text text-center font-bold">
        <p>Leetcode Calendar for</p>
        <span className="text-leetcode-orange">{username}</span>
      </div>}
      <div className="flex flex-col items-center gap-6">
        <div className="p-8 bg-secondary-background rounded-xl">
          <Calendar
            username={username}
            year={year}
          />
        </div>
        <div className="flex flex-row justify-center gap-4">
          <Settings
            username={username}
            year={year}
            showTitle={showTitle}
            loadingUsername={loadingUsername}
            updateUsername={updateUsername}
            updateYear={updateYear}
            updateShowTitle={updateShowTitle}
          />
          <Feedback />
        </div>
      </div>
    </div>
  );
}
