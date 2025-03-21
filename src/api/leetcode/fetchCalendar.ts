export default async function fetchLeetCodeCalendar(username: string, timeRange: TimeRangeType) {
  try {
    const variables = (timeRange === "Previous 365 Days")
      ? { "username": username }
      : { "username": username, "year": new Date().getUTCFullYear() };
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        query: `query userProfileCalendar($username: String!, $year: Int) {
          matchedUser(username: $username) {
            userCalendar(year: $year) {
              submissionCalendar
            }
          }
        }`,
        variables: variables
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    return parseCalendar(json.data.matchedUser?.userCalendar.submissionCalendar ?? "", timeRange);
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return null;
  }
}

function parseCalendar(rawData: string, timeRange: TimeRangeType) {
  
  const parsedCalendar: Data = [];

  // Add data from LeetCode API
  if (rawData !== "") {
    const jsonData: JSONData = JSON.parse(rawData);
    for (const [date, count] of Object.entries(jsonData)) {
      parsedCalendar.push({
        date: formatDate(parseInt(date) * 1000),
        count: count,
        level: getLevelFromCount(count, jsonData),
      });
    }
  }

  // If either the start or end date aren't included in data, then add them (so that the calendar is full)

  const currentYear = new Date().getUTCFullYear();
  const prevYearSameDay = new Date().setUTCFullYear(currentYear - 1);

  const startDate = (timeRange === "Previous 365 Days") ? formatDate(prevYearSameDay) : `${currentYear}-01-01`;
  const endDate   = (timeRange === "Previous 365 Days") ? formatDate(Date.now())      : `${currentYear}-12-31`;

  if (parsedCalendar.length === 0 || parsedCalendar[0].date !== startDate) {
    parsedCalendar.unshift({ date: startDate, count: 0, level: 0 });
  }
  if (parsedCalendar.length === 0 || parsedCalendar[parsedCalendar.length - 1].date !== endDate) {
    parsedCalendar.push({ date: endDate, count: 0, level: 0 });
  }

  return parsedCalendar;
  
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

function getLevelFromCount(count: number, jsonData: JSONData) {
  if (count === 0) return 0;
  const maxCount: number = Math.max(...Object.values(jsonData) as number[]);
  return Math.ceil((count / maxCount) * 4);
}
