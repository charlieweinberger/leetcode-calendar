import { cva } from "class-variance-authority";

export const color = cva("color", {
  variants: {
    dataSource: {
      GitHub: "text-GitHub-color",
      LeetCode: "text-LeetCode-color",
      WakaTime: "text-WakaTime-color",
    },
  },
  defaultVariants: {
    dataSource: "GitHub"
  }
});

export const t1 = cva("t1", {
  variants: {
    dataSource: {
      GitHub: "text-GitHub-t1",
      LeetCode: "text-LeetCode-t1",
      WakaTime: "text-WakaTime-t1",
    },
  },
  defaultVariants: {
    dataSource: "GitHub"
  }
});

export const t2 = cva("t2", {
  variants: {
    dataSource: {
      GitHub: "text-GitHub-t2",
      LeetCode: "text-LeetCode-t2",
      WakaTime: "text-WakaTime-t2",
    },
  },
  defaultVariants: {
    dataSource: "GitHub"
  }
});

export const bg1 = cva("bg1", {
  variants: {
    dataSource: {
      GitHub: "bg-GitHub-bg1",
      LeetCode: "bg-LeetCode-bg1",
      WakaTime: "bg-WakaTime-bg1",
    },
  },
  defaultVariants: {
    dataSource: "GitHub"
  }
});

export const bg2 = cva("bg2", {
  variants: {
    dataSource: {
      GitHub: "bg-GitHub-bg2",
      LeetCode: "bg-LeetCode-bg2",
      WakaTime: "bg-WakaTime-bg2",
    },
  },
  defaultVariants: {
    dataSource: "GitHub"
  }
});

export const bg3 = cva("bg3", {
  variants: {
    dataSource: {
      GitHub: "bg-GitHub-bg3",
      LeetCode: "bg-LeetCode-bg3",
      WakaTime: "bg-WakaTime-bg3",
    },
  },
  defaultVariants: {
    dataSource: "GitHub"
  }
});

export const bg4 = cva("bg4", {
  variants: {
    dataSource: {
      GitHub: "bg-GitHub-bg4",
      LeetCode: "bg-LeetCode-bg4",
      WakaTime: "bg-WakaTime-bg4",
    },
  },
  defaultVariants: {
    dataSource: "GitHub"
  }
});
