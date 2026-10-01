import type { Playlist } from '../types/signage';

export function getPlaylistName(
  playlistId: string | null,
  playlists: Playlist[],
): string {
  if (!playlistId) {
    return 'Unassigned';
  }

  const playlist = playlists.find((item) => item.id === playlistId);

  return playlist?.name ?? 'Playlist unavailable';
}