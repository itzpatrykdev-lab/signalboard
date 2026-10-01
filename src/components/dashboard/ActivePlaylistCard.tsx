import type { Playlist } from '../../types/signage';

interface ActivePlaylistCardProps {
  playlist: Playlist | undefined;
}

function ActivePlaylistCard({ playlist }: ActivePlaylistCardProps) {
  if (!playlist) {
    return (
      <section className="dashboard-card active-playlist-card">
        <p className="section-eyebrow">Active playlist</p>
        <h2>No playlist assigned</h2>
        <p className="active-playlist-card__description">
          Assign a playlist to a screen to start publishing content.
        </p>
      </section>
    );
  }

  return (
    <section className="dashboard-card active-playlist-card">
      <p className="section-eyebrow">Active playlist</p>

      <div className="active-playlist-card__content">
        <div className="active-playlist-card__icon" aria-hidden="true">
          ▶
        </div>

        <div>
          <h2>{playlist.name}</h2>
          <p className="active-playlist-card__description">
            {playlist.itemCount} items · {playlist.screenCount} screens assigned
          </p>
        </div>
      </div>

      <button className="secondary-button" type="button">
        View playlist
      </button>
    </section>
  );
}

export default ActivePlaylistCard;