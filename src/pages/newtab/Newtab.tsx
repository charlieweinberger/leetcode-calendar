import CalendarContainer from "@src/components/CalendarContainer";

export default function Newtab() {
  const username: string = "charliebrown364";
  const graph: graphType = "yearly";
  return (
    <div className="h-screen bg-primary-background flex flex-col gap-16 items-center">
      <div className="mt-48 flex flex-col items-center gap-4 text-6xl text-primary-text font-bold">
        Leetcode Calendar for <span className="text-leetcode-orange">{username}</span>
      </div>
      <CalendarContainer username={username} graph={graph} />
    </div>
  );
}
