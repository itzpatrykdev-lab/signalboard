export type ScreenStatus = 'online' | 'warning' | 'offline';

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
  screenCount: number;
  itemCount: number;
  updatedAtLabel: string;
  previewColors: string[];
}

export type ActivityType = 'heartbeat' | 'playlist-updated' | 'connection-lost';

export interface DeviceActivity {
  id: string;
  screenId: string;
  screenName: string;
  type: ActivityType;
  occurredAtLabel: string;
}