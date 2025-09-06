import { ClassValue, clsx } from "clsx"
import { extendTailwindMerge, } from "tailwind-merge"

export const tw = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "subheading",
            "footer",
            "caption",
            "paragraph-1",
            "paragraph-2",
            "paragraph-3",
            "display-1",
            "display-2",
            "heading-1",
            "heading-1",
            "heading-1-sm",
            "heading-2",
            "heading-2-sm",
            "heading-3",
            "heading-3-sm",
            "heading-4",
            "heading-4-sm",
            "heading-5",
            "heading-5-sm",
            "heading-6",
            "heading-6-sm",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return tw(clsx(inputs));
}