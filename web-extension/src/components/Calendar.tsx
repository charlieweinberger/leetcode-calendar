import { ActivityCalendar, Skeleton, ThemeInput } from "react-activity-calendar";

export default function Calendar({ year, data, loadingUsername }: {
  year: yearType
  data: Data
  loadingUsername: boolean
}) {

  const leetcodeTheme: ThemeInput = {
    light: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
    dark: ["#393939", "#2b642a", "#459741", "#5fbf56", "#97df93"],
  };
  const colorScheme: "dark" | "light" | undefined = "dark";
  const yearLabel: string = (year === "Previous 365 Days")
    ? "the past year"
    : new Date().getUTCFullYear().toString();

  if (!data.length || loadingUsername) {
    return <Skeleton colorScheme={colorScheme} loading />;
  }

  return (
    <div className="text-primary-text">
      <ActivityCalendar
        data={data}
        theme={leetcodeTheme}
        colorScheme={colorScheme}
        labels={{
          totalCount: `{{count}} submissions in ${yearLabel}`
        }}
      />
    </div>
  );
}
