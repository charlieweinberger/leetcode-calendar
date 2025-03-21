// Settings types

type dataSourceType = "GitHub" | "LeetCode" | "WakaTime";
type timeRangeType = "Year to Date" | "Previous 365 Days";
type showTitleType = "Yes" | "No";
type colorType = "Green" | "Orange";

// Data

interface jsonData {
  [key: string]: number;
}

interface Datum {
  date: string;
  count: number;
  level: number;
}

type Data = Datum[];

// Feedback

interface Feedback {
  feedbackType: FeedbackType
  feedbackContent: string
  userEmail?: string
}

type feedbackType = "Suggestion" | "Bug";