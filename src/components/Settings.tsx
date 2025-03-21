import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Dropdown from "@/components/Dropdown";

export default function Settings({
  username,
  dataSource,
  timeRange,
  showTitle,
  // colorway,
  loadingUsername,
  updateUsername,
  updateDataSource,
  updateTimeRange,
  updateShowTitle,
  // updateColorway,
}: {
  username: string;
  dataSource: DataSourceType;
  timeRange: TimeRangeType;
  showTitle: boolean;
  // colorway: ColorwayType;
  loadingUsername: boolean;
  updateUsername: (username: string) => void;
  updateDataSource: (dataSource: DataSourceType) => void;
  updateTimeRange: (timeRange: TimeRangeType) => void;
  updateShowTitle: (showTitle: boolean) => void;
  // updateColorway: (colorway: ColorwayType) => void;
}) {
  const [usernameInput, setUsernameInput] = useState(username);
  const [dataSourceInput, setDataSourceInput] = useState<DataSourceType>(dataSource);
  const [timeRangeInput, setTimeRangeInput] = useState<TimeRangeType>(timeRange);
  const [showTitleInput, setShowTitleInput] = useState<boolean>(showTitle);
  // const [colorwayInput, setColorwayInput] = useState<ColorwayType>(colorway);
  const [open, setOpen] = useState(false);

  useEffect(() => setDataSourceInput(dataSource), [dataSource]);
  useEffect(() => setTimeRangeInput(timeRange), [timeRange]);
  useEffect(() => setShowTitleInput(showTitle), [showTitle]);
  // useEffect(() => setColorwayInput(colorway), [colorway]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUsername(usernameInput);
    updateDataSource(dataSourceInput);
    updateTimeRange(timeRangeInput);
    updateShowTitle(showTitleInput);
    // updateColorway(colorwayInput);
    setOpen(false);
  };

  return (
    <Dialog
      open={open || (username === "" && !loadingUsername)}
      onOpenChange={() => setOpen(!open)}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className={`bg-${dataSource}-bg2 hover:bg-${dataSource}-bg3`}
        >
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent
        className={`w-88 p-8 text-${dataSource}-t1 bg-${dataSource}-bg2 rounded-xl border-none`}
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription className={`text-${dataSource}-t2`}>
            Update your LeetCode username and preferred time range.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-[30%_70%] gap-y-4">
            <Label>Username</Label>
            <Input
              defaultValue={username}
              placeholder="username"
              onChange={(e) => setUsernameInput(e.target.value)}
              className={`border-none bg-${dataSource}-bg3 hover:bg-${dataSource}-bg4 active:bg-${dataSource}-bg4 selection:bg-${dataSource}`}
            />
            <Label>Data Source</Label>
            <Dropdown
              dataSource={dataSource}
              options={["GitHub", "LeetCode", "WakaTime"]}
              input={dataSourceInput}
              setInput={setDataSourceInput}
              width={"w-46"}
            />
            <Label>Time Range</Label>
            <Dropdown
              dataSource={dataSource}
              options={["Year to Date", "Previous 365 Days"]}
              input={timeRangeInput}
              setInput={setTimeRangeInput}
              width={"w-46"}
            />
            <Label>Show Title</Label>
            <Dropdown
              dataSource={dataSource}
              options={[true, false]}
              optionsDisplayMap={
                new Map<boolean, string>([
                  [true, "Yes"],
                  [false, "No"],
                ])
              }
              input={showTitleInput}
              setInput={setShowTitleInput}
              width={"w-46"}
            />
            {/* <Label>Colorway</Label>
            <Dropdown
              dataSource={dataSource}
              options={[
                "GitHub",
                "LeetCode (Green)",
                "LeetCode (Orange)",
                "WakaTime",
              ]}
              input={colorwayInput}
              setInput={setColorwayInput}
              width={"w-46"}
            /> */}
          </div>
          <Button
            type="submit"
            className={`bg-${dataSource} hover:bg-${dataSource}/80 font-bold`}
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
