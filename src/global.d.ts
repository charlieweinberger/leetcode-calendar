type yearType = "Year to Date" | "Previous 365 Days";

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