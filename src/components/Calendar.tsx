import { Leetcodecalendar } from "react-leetcode-calendar";

export default function Calendar({ username }: LeetCodeCalendarProps) {
  return (
    <div className="text-primary-text [&_h2]:hidden
    [&_rect[data-level='0']]:fill-leetcode-level-0
    [&_rect[data-level='1']]:fill-leetcode-level-1
    [&_rect[data-level='2']]:fill-leetcode-level-2
    [&_rect[data-level='3']]:fill-leetcode-level-3
    [&_rect[data-level='4']]:fill-leetcode-level-4
    [&_footer>div:nth-of-type(2)>svg:nth-of-type(1)_rect]:fill-leetcode-level-0
    [&_footer>div:nth-of-type(2)>svg:nth-of-type(2)_rect]:fill-leetcode-level-1
    [&_footer>div:nth-of-type(2)>svg:nth-of-type(3)_rect]:fill-leetcode-level-2
    [&_footer>div:nth-of-type(2)>svg:nth-of-type(4)_rect]:fill-leetcode-level-3
    [&_footer>div:nth-of-type(2)>svg:nth-of-type(5)_rect]:fill-leetcode-level-4">
      <Leetcodecalendar username={username} />
    </div>
  )
}
