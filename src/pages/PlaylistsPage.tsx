import MetricCard from "../components/dashboard/MetricCard";
import PlaylistCard from "../components/playlists/PlaylistCard";
import { playlists, screens } from "../data/mockSignageData";
import "../styles/playlists.css";

function PlaylistsPage() {
  const publishedPlaylists = playlists.filter((playlist) =>
    screens.some((screen) => screen.activePlaylistId === playlist.id),
  );
  const totalContentItems = playlists.reduce(
    (total, playlist) => total + playlist.contentItemIds.length,
    0,
  );

  return (
    <div className="playlists-page">
      <section className="page-heading">
        <div>
          <p className="section-eyebrow">Content delivery</p>
          <h1>Playlists</h1>
          <p className="page-heading__description">
            Create, organize, and publish content loops to your displays.
          </p>
        </div>

        <button className="primary-button" type="button">
          + Create playlist
        </button>
      </section>

      <section aria-label="Playlist summary" className="playlist-metrics">
        <MetricCard
          detail="Available content loops"
          label="Total Playlists"
          tone="default"
          value={playlists.length}
        />
        <MetricCard
          detail="Assigned to at least one display"
          label="Published"
          tone="success"
          value={publishedPlaylists.length}
        />
        <MetricCard
          detail="Across every playlist"
          label="Content Items"
          tone="default"
          value={totalContentItems}
        />
      </section>

      <section className="playlist-grid" aria-label="Available playlists">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            screens={screens}
          />
        ))}
      </section>
    </div>
  );
}

export default PlaylistsPage;
