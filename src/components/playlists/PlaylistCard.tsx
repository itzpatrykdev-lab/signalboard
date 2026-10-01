import { Link } from "react-router-dom";
import type { Playlist, SignageScreen } from "../../types/signage";

interface PlaylistCardProps {
  playlist: Playlist;
  screens: SignageScreen[];
}

function PlaylistCard({ playlist, screens }: PlaylistCardProps) {
  const assignedScreenCount = screens.filter(
    (screen) => screen.activePlaylistId === playlist.id,
  ).length;

  return (
    <article className="playlist-card">
      <div className="playlist-card__preview" aria-hidden="true">
        {playlist.previewColors.map((color) => (
          <span
            className="playlist-card__preview-panel"
            key={color}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div className="playlist-card__content">
        <div className="playlist-card__header">
          <div>
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
          </div>

          <span className="playlist-card__status">
            {assignedScreenCount > 0 ? "Published" : "Draft"}
          </span>
        </div>

        <div className="playlist-card__metadata">
          <span>{playlist.contentItemIds.length} items</span>
          <span>{assignedScreenCount} screens assigned</span>
        </div>

        <div className="playlist-card__footer">
          <span>{playlist.updatedAtLabel}</span>

          <Link className="text-button" to={`/playlists/${playlist.id}`}>
            View playlist →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PlaylistCard;
