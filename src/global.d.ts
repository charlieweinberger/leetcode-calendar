type yearType = "Previous 365 Days" | "Year to Date";

interface jsonData {
  [key: string]: number;
}

interface Datum {
  date: string;
  count: number;
  level: number;
}

type Data = Datum[];

interface Feedback {
  feedbackType: FeedbackType
  feedbackContent: string
  userEmail?: string
}

type feedbackType = "Suggestion" | "Bug";