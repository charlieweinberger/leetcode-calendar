// Settings types

type DataSourceType = "GitHub" | "LeetCode" | "WakaTime";
type TimeRangeType = "Year to Date" | "Previous 365 Days";
// type ColorwayType = "GitHub" | "LeetCode (Green)" | "LeetCode (Orange)" | "WakaTime";

// Data

interface JSONData {
  [key: string]: number;
}

interface Datum {
  date: string;
  count: number;
  level: number;
}

type Data = Datum[];

type ActivityUnitType = "contributions" | "submissions" | "minutes";

// Feedback

interface Feedback {
  feedbackType: FeedbackType
  feedbackContent: string
  userEmail?: string
}

type FeedbackType = "Suggestion" | "Bug";