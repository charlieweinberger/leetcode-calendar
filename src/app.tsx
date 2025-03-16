import { useState, useEffect } from "react";
import browser from "webextension-polyfill";

import Calendar from "@/components/Calendar";
import Settings from "@/components/Settings";
import Feedback from "@/components/Feedback";

export default function App() {
  const [username, setUsername] = useState("");
  const [year, setYear] = useState<yearType>("Previous 365 Days");
  const [showTitle, setShowTitle] = useState<showTitleType>("Yes");
  const [color, setColor] = useState<colorType>("Green");

  const [loadingUsername, setLoadingUsername] = useState(true);

  // Get data from browser storage
  useEffect(() => {
    browser.storage.sync.get(["username", "year", "showTitle", "color"]).then(
      (result: {
        username?: string;
        year?: yearType;
        showTitle?: showTitleType;
        color?: colorType;
      }) => {
        setUsername(result.username ?? username);
        setLoadingUsername(false);
        setYear(result.year ?? year);
        setShowTitle(result.showTitle ?? showTitle);
        setColor(result.color ?? color);
      },
      (error) => {
        console.log(`Error getting data from browser storage: ${error}`);
      }
    );
  }, [username, year, showTitle, color]);

  // Set data to browser storage
  const updateUsername = (input: string) => {
    const newUsername = input.toLowerCase().trim();
    if (!newUsername) return;
    setUsername(newUsername);
    browser.storage.sync.set({ username: newUsername });
  };

  const updateYear = (newYear: yearType) => {
    setYear(newYear);
    browser.storage.sync.set({ year: newYear });
  };

  const updateShowTitle = (newShowTitle: showTitleType) => {
    setShowTitle(newShowTitle);
    browser.storage.sync.set({ showTitle: newShowTitle });
  };

  const updateColor = (newColor: colorType) => {
    setColor(newColor);
    browser.storage.sync.set({ color: newColor });
  };

  return (
    <div className="h-screen bg-primary-background flex flex-col justify-center items-center gap-12">
      {showTitle === "Yes" && (
        <div className="px-8 flex flex-col items-center justify-center gap-2 text-6xl text-primary-text text-center font-bold">
          <p>Leetcode Calendar for</p>
          <span className="text-leetcode-orange">{username}</span>
        </div>
      )}
      <div className="flex flex-col items-center gap-6">
        <div className="p-8 bg-secondary-background rounded-xl">
          <Calendar username={username} year={year} color={color} />
        </div>
        <div className="flex flex-row justify-center gap-4">
          <Settings
            username={username}
            year={year}
            showTitle={showTitle}
            color={color}
            loadingUsername={loadingUsername}
            updateUsername={updateUsername}
            updateYear={updateYear}
            updateShowTitle={updateShowTitle}
            updateColor={updateColor}
          />
          <Feedback />
        </div>
      </div>
    </div>
  );
}
