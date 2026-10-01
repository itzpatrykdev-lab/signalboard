import type { Playlist } from '../../types/signage';

interface PlaylistCardProps {
  playlist: Playlist;
}

function PlaylistCard({ playlist }: PlaylistCardProps) {
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
            {playlist.screenCount > 0 ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="playlist-card__metadata">
          <span>{playlist.itemCount} items</span>
          <span>{playlist.screenCount} screens assigned</span>
        </div>

        <div className="playlist-card__footer">
          <span>{playlist.updatedAtLabel}</span>

          <button className="text-button" type="button">
            View playlist →
          </button>
        </div>
      </div>
    </article>
  );
}

export default PlaylistCard;