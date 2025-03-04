type yearType = number | "prev";

interface CalendarConfig {
  username: string;
  year: yearType;
}

interface jsonData {
  [key: string]: number;
}

interface Datum {
  date: string;
  count: number;
  level: number;
}

type Data = Datum[];