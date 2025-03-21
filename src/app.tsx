import { useState, useEffect } from "react";
import browser from "webextension-polyfill";

import Calendar from "@/components/Calendar";
import Settings from "@/components/Settings";
import Feedback from "@/components/Feedback";

export default function App() {
  const [username, setUsername] = useState("");
  const [dataSource, setDataSource] = useState<DataSourceType>("LeetCode");
  const [timeRange, setTimeRange] = useState<TimeRangeType>("Previous 365 Days");
  const [showTitle, setShowTitle] = useState(true);
  // const [color, setColor] = useState<colorType>("Green");

  const [loadingUsername, setLoadingUsername] = useState(true);

  // Get data from browser storage
  useEffect(() => {
    browser.storage.sync
      .get([
        "username",
        "dataSource",
        "timeRange",
        "showTitle",
        // "color"
      ])
      .then(
        (result: {
          username?: string;
          dataSource?: DataSourceType;
          timeRange?: TimeRangeType;
          showTitle?: boolean;
          // color?: colorType;
        }) => {
          setUsername(result.username ?? username);
          setLoadingUsername(false);
          setDataSource(result.dataSource ?? dataSource);
          setTimeRange(result.timeRange ?? timeRange);
          setShowTitle(result.showTitle ?? showTitle);
          // setColor(result.color ?? color);
        },
        (error) => {
          console.log(`Error getting data from browser storage: ${error}`);
        }
      );
  }, [
    username,
    dataSource,
    timeRange,
    showTitle,
    // color
  ]);

  // Set data to browser storage
  const updateUsername = (input: string) => {
    const newUsername = input.toLowerCase().trim();
    if (!newUsername) return;
    setUsername(newUsername);
    browser.storage.sync.set({ username: newUsername });
  };

  const updateDataSource = (newDataSource: DataSourceType) => {
    setDataSource(newDataSource);
    browser.storage.sync.set({ dataSource: newDataSource });
  };

  const updateTimeRange = (newTimeRange: TimeRangeType) => {
    setTimeRange(newTimeRange);
    browser.storage.sync.set({ timeRange: newTimeRange });
  };

  const updateShowTitle = (newShowTitle: boolean) => {
    setShowTitle(newShowTitle);
    browser.storage.sync.set({ showTitle: newShowTitle });
  };

  // const updateColor = (newColor: colorType) => {
  //   setColor(newColor);
  //   browser.storage.sync.set({ color: newColor });
  // };

  return (
    <div className={`h-screen bg-${dataSource}-bg-1 flex flex-col justify-center items-center gap-12`}>
      {showTitle && (
        <div className={`px-8 flex flex-col items-center justify-center gap-2 text-6xl text-${dataSource}-text-1 text-center font-bold`}>
          <p>{dataSource} Calendar for</p>
          <span className={`text-${dataSource}`}>{username}</span>
        </div>
      )}
      <div className="flex flex-col items-center gap-6">
        <div className={`p-8 bg-${dataSource}-bg-2 rounded-xl`}>
          <Calendar
            username={username}
            dataSource={dataSource}
            timeRange={timeRange}
            // color={color}
          />
        </div>
        <div className="flex flex-row justify-center gap-4">
          <Settings
            username={username}
            dataSource={dataSource}
            timeRange={timeRange}
            showTitle={showTitle}
            // color={color}
            loadingUsername={loadingUsername}
            updateUsername={updateUsername}
            updateDataSource={updateDataSource}
            updateTimeRange={updateTimeRange}
            updateShowTitle={updateShowTitle}
            // updateColor={updateColor}
          />
          <Feedback />
        </div>
      </div>
    </div>
  );
}
