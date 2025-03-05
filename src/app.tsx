import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import Settings from "@/components/Settings";
import { fetchData } from "@/lib/getData";

export default function App() {

  const [ username, setUsername ] = useState<string>("");
  const [ year, setYear ] = useState<yearType>(new Date().getUTCFullYear());
  const [ data, setData ] = useState<Data>([]);

  // Get username from storage
  useEffect(() => {
    chrome.storage.sync.get(["username"], (result) => {
      if (result.username) {
        setUsername(result.username);
      }
    });
  }, [username]);

  // Set username to storage
  const updateUsername = (input: string) => {
    const newUsername = input.toLowerCase().trim();
    if (newUsername) {
      chrome.storage.sync.set({ "username": newUsername }, () => {
        setUsername(newUsername);
      });
    }
  };

  // Get year from storage
  useEffect(() => {
    chrome.storage.sync.get(["year"], (result) => {
      if (result.year) {
        setYear(result.year);
      }
    });
  }, [year]);

  // Set username to storage
  const updateYear = (year: yearType) => {
    chrome.storage.sync.set({ "year": year }, () => {
      setYear(year);
    });
  };

  // Fetch data from Leetcode API
  const updateCalendar = async (newUsername: string, newYear: yearType) => {
    const parsedData = await fetchData(newUsername, newYear);
    if (!parsedData) {
      //! Display error in UI
      return;
    }
    setData(parsedData);
  }

  // Update data whenever username is updated
  useEffect(() => {
    updateCalendar(username, year);
  }, [username, year]);

  // TODO: Make settings modal appear INSTEAD of the calendar (not as a modal) if the username is empty OR do what is described in the if statement below

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
          <Calendar
            year={year}
            data={data}
          />
        </div>
        <Settings
          username={username}
          year={year}
          updateUsername={updateUsername}
          updateYear={updateYear}
          updateCalendar={updateCalendar}
        />
      </div>
    </div>
  );
}
