<h1 align="center">Leetcode Calendar</h1>

<h3 align="center">A chrome extension that displays your leetcode submission history as a heatmap/calendar every time you open a new tab!</h3>

<img src="./public/screenshot.png" />

## Links

- Chrome Web Store: https://chromewebstore.google.com/detail/leetcode-calendar/adakeigfgmhioifigjibpjdbgnanogkc
- Privacy Policy: https://github.com/charlieweinberger/leetcode-calendar/blob/main/PRIVACY_POLICY.md

## How it works

Do you want to spend more time doing leetcode, but keep putting it off or forgetting to make time for it? If so, then this chrome extension is for you. Leetcode Calendar is a chrome extension that shows a minimalist view of your leetcode submission history as a heatmap/calendar every time you open a new tab. By reminding you of your leetcode progress every time you open a new tab, you'll never forget to do your daily leetcode problem to get that green square.

Currently you can choose which account to view simply by inputting your leetcode username, and you can choose which time range to view (either the current year or the previous 365 days). You can also submit feedback for future suggestions/bugs. It's a rather simple chrome extension for now, but I've got a lot planned for the future, such as more leetcode statistics and a weekly leaderboard. Stay tuned!

## Tech Stack

- Frontend: React, Vite, TypeScript
- Styling: Tailwind CSS, shadcn/ui
- APIs: Leetcode GraphQL API, Chrome Storage API
- Email Feedback: Resend

## Future improvements

- [ ] More leetcode profile statistics
- [ ] A weekly leaderboard
- [ ] More customization and interactivity (for example, theme settings and tooltips)
- [ ] Caching data so it doesn't fetch the API on every new tab
- [ ] Support for Firefox
- [ ] Expansion to GitHub and WakaTime