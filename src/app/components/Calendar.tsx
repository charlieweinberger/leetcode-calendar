"use client";

import { useState, useEffect } from "react";
import { ActivityCalendar, Skeleton, ThemeInput } from "react-activity-calendar";

async function fetchData(username: string, year: number) {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `query userProfileCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) {
              submissionCalendar
            }
          }
        }`,
        variables: {
          "username": username,
          "year": year
        }
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    return parseData(json.data.matchedUser.userCalendar.submissionCalendar);
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return null;
  }
}

function parseData(rawData: string) {
  const jsonData: jsonData = JSON.parse(rawData);
  const parsedData: Data = [];
  for (const [date, count] of Object.entries(jsonData)) {
    parsedData.push({
      date: convertTimestampToDate(parseInt(date)),
      count: count,
      level: getLevelFromCount(count, jsonData),
    });
  }
  console.log(parsedData);
  return parsedData;
}

function convertTimestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

function getLevelFromCount(count: number, jsonData: jsonData) {
  if (count === 0) return 0;
  const maxCount: number = Math.max(...Object.values(jsonData) as number[]);
  return Math.ceil((count / maxCount) * 4);
}

export default function Calendar({ username, year }: CalendarConfig) {
  
  const [ data, setData ] = useState<Data>([]);

  const leetcodeTheme: ThemeInput = {
    light: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
    dark: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
  };

  useEffect(() => {
    const updateData = async () => {
      const parsedData = await fetchData(username, year);
      if (!parsedData) {
        console.error("Failed to fetch data");
        //! Display error in UI
        return;
      }
      setData(parsedData);
    }
    updateData();
  }, [username]);

  if (!data.length) {
    return <Skeleton loading />;
  }

  return (
    <div className="text-primary-text">
      <ActivityCalendar
        data={data}
        theme={leetcodeTheme}
        colorScheme="dark"
        showWeekdayLabels={true}
        labels={{
          totalCount: "{{count}} submissions in the past year"
        }}
      />
    </div>
  );
}
