import { useState, useEffect, cloneElement } from "react";

import { ActivityCalendar, Skeleton } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";

import GitHubCalendar from 'react-github-calendar';
import fetchLeetCodeData from "@/api/leetcode/fetchLeetCodeData";

import { LEETCODE_GREEN, LEETCODE_ORANGE } from "@/lib/colorways";

export default function Calendar({
  username,
  calendarType,
  year,
  color,
}: {
  username: string
  calendarType: calendarType
  year: yearType
  color: colorType
}) {
  const [data, setData] = useState<Data>([]);

  // Update data whenever username or year are updated
  useEffect(() => {
    // Get data from LeetCode API
    const updateCalendar = async (newUsername: string, newYear: yearType) => {
      if (newUsername === "") return;
      const parsedData = await fetchLeetCodeData(newUsername, newYear);
      setData(parsedData ?? data);
    };
    updateCalendar(username, year);
  }, [username, year]);

  const yearLabel: string =
    year === "Previous 365 Days"
      ? "the past year"
      : new Date().getUTCFullYear().toString();
  const colorScale: string[] =
    color === "Green" ? LEETCODE_GREEN : LEETCODE_ORANGE;

  if (!data.length) {
    return <Skeleton colorScheme="dark" loading />;
  }

  if (calendarType === "GitHub") {
    return (
      <div className="text-primary-text">
        <GitHubCalendar
          username={username}
          colorScheme="dark"
          theme={{
            light: colorScale,
            dark: colorScale,
          }}
          renderBlock={(block, activity) =>
            cloneElement(block, {
              'data-tooltip-id': 'react-tooltip',
              'data-tooltip-html': (activity.count !== 0) ? `${activity.count} contributions on ${activity.date}` : "",
              style: { outline: 'none' }
            })
          }
        />
        <Tooltip
          id="react-tooltip"
          style={{
            backgroundColor: "var(--color-tertiary-background)",
            color: "var(--color-primary-text)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="text-primary-text">
      <ActivityCalendar
        data={data}
        colorScheme="dark"
        theme={{
          light: colorScale,
          dark: colorScale,
        }}
        labels={{
          totalCount: `{{count}} submissions in ${yearLabel}`,
        }}
        renderBlock={(block, activity) =>
          cloneElement(block, {
            'data-tooltip-id': 'react-tooltip',
            'data-tooltip-html': (activity.count !== 0) ? `${activity.count} submissions on ${activity.date}` : "",
            style: { outline: 'none' }
          })
        }
      />
      <Tooltip
        id="react-tooltip"
        style={{
          backgroundColor: "var(--color-tertiary-background)",
          color: "var(--color-primary-text)",
        }}
      />
    </div>
  );
}
