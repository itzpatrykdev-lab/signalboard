import type { Playlist, SignageScreen } from "../../types/signage";

interface ActivePlaylistCardProps {
  playlist: Playlist | undefined;
  screens: SignageScreen[];
}

function ActivePlaylistCard({ playlist, screens }: ActivePlaylistCardProps) {
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

  const assignedScreenCount = screens.filter(
    (screen) => screen.activePlaylistId === playlist.id,
  ).length;

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
            {playlist.contentItemIds.length} items · {assignedScreenCount}{" "}
            screens assigned
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
