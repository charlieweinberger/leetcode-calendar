type yearType = number | "prev";

interface jsonData {
  [key: string]: number;
}

interface Datum {
  date: string;
  count: number;
  level: number;
}

type Data = Datum[];