export async function fetchData(username: string, year: yearType) {
  try {
    const variables = (year === "prev")
      ? { "username": username }
      : { "username": username, "year": year };
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
    return parseData(json.data.matchedUser?.userCalendar.submissionCalendar ?? "", year);
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    return null;
  }
}

function parseData(rawData: string, year: yearType) {
  
  const parsedData: Data = [];

  // Add data from leetcode API
  const jsonData: jsonData = JSON.parse(rawData);
  for (const [date, count] of Object.entries(jsonData)) {
    parsedData.push({
      date: formatDate(parseInt(date) * 1000),
      count: count,
      level: getLevelFromCount(count, jsonData),
    });
  }

  // If start or end date aren't included in data, add them (so calendar is full)

  const startDate = (year === "prev")
    ? formatDate(new Date().setUTCFullYear(new Date().getUTCFullYear() - 1))
    : `${year}-01-01`;
  const endDate = (year === "prev")
    ? formatDate()
    : `${year}-12-31`;

  if (parsedData.length === 0 || parsedData[0].date !== startDate) {
    parsedData.unshift({ date: startDate, count: 0, level: 0 });
  }
  if (parsedData.length === 0 || parsedData[parsedData.length - 1].date !== endDate) {
    parsedData.push({ date: endDate, count: 0, level: 0 });
  }

  return parsedData;
  
}

function formatDate(timestamp: number = Date.now()) {
  const date = new Date(timestamp);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;
  return `${year}-${formattedMonth}-${formattedDay}`;
}

function getLevelFromCount(count: number, jsonData: jsonData) {
  if (count === 0) return 0;
  const maxCount: number = Math.max(...Object.values(jsonData) as number[]);
  return Math.ceil((count / maxCount) * 4);
}
