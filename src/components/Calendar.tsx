import { useState, useEffect } from "react";
import fetchData from "@/api/leetcode/fetchData";
import { ActivityCalendar, Skeleton, ThemeInput } from "react-activity-calendar";

export default function Calendar({ username, year }: {
  username: string
  year: yearType
}) {

  const [ data, setData ] = useState<Data>([]);

  // Update data whenever username or year are updated
  useEffect(() => {
    // Get data from Leetcode API
    const updateCalendar = async (newUsername: string, newYear: yearType) => {
      if (newUsername === "") return;
      const parsedData = await fetchData(newUsername, newYear);
      setData(parsedData ?? data);
    }
    updateCalendar(username, year);
  }, [username, year]);

  const leetcodeTheme: ThemeInput = {
    light: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
    dark: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
  };
  const colorScheme: "dark" | "light" | undefined = "dark";
  const yearLabel: string = (year === "Previous 365 Days")
    ? "the past year"
    : new Date().getUTCFullYear().toString();

  if (!data.length) {
    return <Skeleton colorScheme={colorScheme} loading />;
  }

  return (
    <div className="text-primary-text">
      <ActivityCalendar
        data={data}
        theme={leetcodeTheme}
        colorScheme={colorScheme}
        labels={{
          totalCount: `{{count}} submissions in ${yearLabel}`
        }}
      />
    </div>
  );
}
