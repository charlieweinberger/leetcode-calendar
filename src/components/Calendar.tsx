import { ActivityCalendar, Skeleton, ThemeInput } from "react-activity-calendar";

export default function Calendar({ year, data }: {
  year: yearType
  data: Data
}) {

  const leetcodeTheme: ThemeInput = {
    light: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
    dark: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
  };

  if (!data.length) {
    return <Skeleton loading />;
  }

  return (
    <div className="text-primary-text">
      <ActivityCalendar
        data={data}
        theme={leetcodeTheme}
        colorScheme="dark"
        labels={{
          totalCount: `{{count}} submissions in ${(year === "prev") ? "the past year" : year}`
        }}
      />
    </div>
  );
}
