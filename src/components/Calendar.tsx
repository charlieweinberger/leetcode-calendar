import { useState, useEffect } from "react";
import fetchData from "@/api/leetcode/fetchData";
import { ActivityCalendar, Skeleton } from "react-activity-calendar";

export default function Calendar({ username, year, color }: {
  username: string
  year: yearType
  color: colorType
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

  const yearLabel: string = (year === "Previous 365 Days")
    ? "the past year"
    : new Date().getUTCFullYear().toString();
  const colorScale: string[] = (color === "Green")
    ? ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"]  // green  
    : ["#393939", "#7a3e12", "#b45f1f", "#eba440", "#f5c882"]; // orange

  if (!data.length) {
    return <Skeleton colorScheme="dark" loading />;
  }

  return (
    <div className="text-primary-text">
      <ActivityCalendar
        data={data}
        colorScheme="dark"
        theme={{
          light: colorScale,
          dark: colorScale
        }}
        labels={{
          totalCount: `{{count}} submissions in ${yearLabel}`
        }}
      />
    </div>
  );
}
