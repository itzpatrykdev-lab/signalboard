import type { ContentType } from "../types/signage";

export const contentTypeLabels: Record<ContentType, string> = {
  announcement: "Announcement",
  image: "Image",
  weather: "Weather",
  calendar: "Calendar",
};

export const contentTypeSymbols: Record<ContentType, string> = {
  announcement: "A",
  image: "▧",
  weather: "☀",
  calendar: "▦",
};
