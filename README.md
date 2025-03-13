<h1 align="center">Leetcode Calendar</h1>

<h3 align="center">A chrome extension that displays your leetcode submission history as a heatmap/calendar every time you open a new tab!</h3>

<img src="./public/screenshot.png" />

## Links

- Chrome Web Store: https://chromewebstore.google.com/detail/leetcode-calendar/adakeigfgmhioifigjibpjdbgnanogkc
- Privacy Policy: https://github.com/charlieweinberger/leetcode-calendar/blob/main/PRIVACY_POLICY.md

## Description

Do you want to spend more time doing leetcode, but keep putting it off or forgetting to make time for it? If so, then this chrome extension is for you. Leetcode Calendar is a chrome extension that shows a minimalist view of your leetcode submission history as a heatmap/calendar every time you open a new tab. By reminding you of your leetcode progress every time you open a new tab, you'll never forget to do your daily leetcode problem to get that green square.

## Current Features

- Display data for any leetcode username
- Toggle whether to view data in the current year (2025) or previous 365 days
- Toggle whether or not to view the title text
- Toggle whether to view a green colorway vs. orange colorway
- Submit user feedback (within the extension)

## Future Improvements

- [ ] More leetcode profile statistics
- [ ] A weekly leaderboard
- [ ] More customization and interactivity (for example, theme settings and tooltips)
- [ ] Caching data so it doesn't fetch the API on every new tab
- [ ] Support for Firefox
- [ ] Expansion to GitHub and WakaTime

## Tech Stack

- Frontend: React, Vite, TypeScript
- Styling: Tailwind CSS, shadcn/ui
- APIs: Leetcode GraphQL API, Chrome Storage API
- Email Feedback: Resend