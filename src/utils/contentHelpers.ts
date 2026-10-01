import type { ContentItem } from '../types/signage';

export function getPlaylistContent(
  contentItemIds: string[],
  contentItems: ContentItem[],
): ContentItem[] {
  return contentItemIds
    .map((contentItemId) =>
      contentItems.find((item) => item.id === contentItemId),
    )
    .filter((item): item is ContentItem => item !== undefined);
}