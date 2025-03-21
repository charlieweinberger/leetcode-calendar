import { useState, useEffect, cloneElement } from "react";

import { ActivityCalendar, Skeleton } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";

import GitHubCalendar from "react-github-calendar";
import fetchLeetCodeCalendar from "@/api/leetcode/fetchCalendar";
import { GITHUB_GREEN, LEETCODE_GREEN, WAKATIME_BLUE } from "@/lib/colorways";

export default function Calendar({
  username,
  dataSource,
  timeRange,
  // colorway,
}:
{
  username: string;
  dataSource: DataSourceType;
  timeRange: TimeRangeType;
  // colorway: ColorwayType
}) {
  const [data, setData] = useState<Data>([]);

  // Update data whenever username or year are updated
  useEffect(() => {
    // Fetch calendar data from LeetCode API
    const updateCalendar = async (
      newUsername: string,
      newTimeRange: TimeRangeType
    ) => {
      if (newUsername === "") return;
      const parsedData = await fetchLeetCodeCalendar(newUsername, newTimeRange);
      setData(parsedData ?? data);
    };
    updateCalendar(username, timeRange);
  }, [username, timeRange]);

  const timeRangeLabel: string =
    timeRange === "Previous 365 Days"
      ? "the past year"
      : new Date().getUTCFullYear().toString();

  let DataCalendar;
  let colorScale;
  let unit;

  if (dataSource === "GitHub") {
    DataCalendar = GitHubCalendar;
    colorScale = GITHUB_GREEN;
    unit = "contributions";
  } else if (dataSource === "LeetCode") {
    DataCalendar = ActivityCalendar;
    colorScale = LEETCODE_GREEN;
    unit = "submissions";
  } else {
    DataCalendar = ActivityCalendar;
    colorScale = WAKATIME_BLUE;
    unit = "minutes";
  }

  if (!data.length) {
    return <Skeleton colorScheme="dark" loading />;
  }

  return (
    <div className={`text-${dataSource}-t1`}>
      <DataCalendar
        data={data} // this might override react-github-calendar's data from username
        username={username}
        colorScheme="dark"
        theme={{ dark: colorScale }}
        labels={{ totalCount: `{{count}} ${unit} in ${timeRangeLabel}` }}
        renderBlock={(block, activity) =>
          cloneElement(block, {
            "data-tooltip-id": "react-tooltip",
            "data-tooltip-html":
              activity.count !== 0
                ? `${activity.count} ${unit} on ${activity.date}`
                : "",
            style: { outline: "none" },
          })
        }
      />
      <Tooltip
        id="react-tooltip"
        style={{
          backgroundColor: `var(--color-${dataSource}-bg3)`,
          color: `var(--color-${dataSource}-t1)`,
        }}
      />
    </div>
  );
}
