import Calendar from "@src/components/Calendar";

export default function CalendarContainer({ username, graph }: LeetCodeCalendarProps) {
  return (
    <div className="p-8 bg-secondary-background rounded-xl">
      <Calendar username={username} graph={graph} />
    </div>
  );
}
