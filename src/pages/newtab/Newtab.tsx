import { Leetcodecalendar } from "react-leetcode-calendar";

function CalendarContainer({ username, graph }: LeetCodeCalendarProps) {
 return (
   <div className="py-8 px-12 bg-neutral-900 rounded-xl">
     <Leetcodecalendar username={username} graph={graph} />
   </div>
 );
}

export default function Newtab() {
 const username: string = "charliebrown364";
 const graph: graphType = "yearly";
 return (
   <div className="h-screen bg-neutral-950 flex items-center justify-center">
     <CalendarContainer username={username} graph={graph} />
   </div>
 );
}
