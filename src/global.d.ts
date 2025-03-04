interface CalendarConfig {
  username: string;
  year: number;
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