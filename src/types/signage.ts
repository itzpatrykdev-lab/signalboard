export type ScreenStatus = "online" | "warning" | "offline";

export interface SignageScreen {
  id: string;
  name: string;
  location: string;
  status: ScreenStatus;
  lastSeenLabel: string;
  activePlaylistId: string | null;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  updatedAtLabel: string;
  previewColors: string[];
  contentItemIds: string[];
}

export type ActivityType = "heartbeat" | "playlist-updated" | "connection-lost";

export interface DeviceActivity {
  id: string;
  screenId: string;
  screenName: string;
  type: ActivityType;
  occurredAtLabel: string;
}

export type ContentType = "announcement" | "image" | "weather" | "calendar";

export type ContentStatus = "published" | "draft";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  updatedAtLabel: string;
  durationSeconds: number;
  description: string;
  accentColor: string;
}
