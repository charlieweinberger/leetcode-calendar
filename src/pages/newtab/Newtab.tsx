import CalendarContainer from "@src/components/CalendarContainer";

export default function Newtab() {
 const username: string = "charliebrown364";
 const graph: graphType = "yearly";
 return (
   <div className="h-screen bg-primary-background flex items-center justify-center">
     <CalendarContainer username={username} graph={graph} />
   </div>
 );
}
