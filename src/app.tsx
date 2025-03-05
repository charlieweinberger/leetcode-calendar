import { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import Settings from "@/components/Settings";
import Feedback from "@/components/Feedback";
import fetchData from "@/api/leetcode/fetchData";

export default function App() {

  const [ username, setUsername ] = useState("");
  const [ year, setYear ] = useState<yearType>(new Date().getUTCFullYear());
  const [ data, setData ] = useState<Data>([]);
  const [ loadingUsername, setLoadingUsername ] = useState(true);
  // Get username from storage
  useEffect(() => {
    chrome.storage.sync.get(["username"], (result) => {
      if (result.username) {
        setUsername(result.username);
      }
      setLoadingUsername(false);
    });
  }, [username]);

  // Update username in storage
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

  // Update year in storage
  const updateYear = (year: yearType) => {
    chrome.storage.sync.set({ "year": year }, () => {
      setYear(year);
    });
  };

  // TODO: Add caching every so often (5 minutes? 1 hour) for data

  // Get data from Leetcode API
  const updateCalendar = async (newUsername: string, newYear: yearType) => {
    const parsedData = await fetchData(newUsername, newYear);
    if (parsedData) {
      setData(parsedData);
    }
  }

  // Update data whenever username is updated
  useEffect(() => {
    updateCalendar(username, year);
  }, [username, year]);

  return (
    <div className="h-screen bg-primary-background flex flex-col gap-16 items-center">
      <div className="mt-48 px-8 flex flex-col items-center justify-center gap-2 text-6xl text-primary-text text-center font-bold">
        <p>Leetcode Calendar for</p>
        <span className="text-leetcode-orange">{username}</span>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="p-8 bg-secondary-background rounded-xl">
          <Calendar
            year={year}
            data={data}
            loadingUsername={loadingUsername}
          />
        </div>
        <div className="flex flex-row justify-center gap-4">
          <Settings
            username={username}
            year={year}
            loadingUsername={loadingUsername}
            updateUsername={updateUsername}
            updateYear={updateYear}
            updateCalendar={updateCalendar}
          />
          <Feedback />
        </div>
      </div>
    </div>
  );
}
