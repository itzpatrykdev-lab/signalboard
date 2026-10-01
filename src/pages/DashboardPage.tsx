import ActivityFeed from "../components/dashboard/ActivityFeed";
import ActivePlaylistCard from "../components/dashboard/ActivePlaylistCard";
import MetricCard from "../components/dashboard/MetricCard";
import ScreenNetworkCard from "../components/dashboard/ScreenNetworkCard";
import { deviceActivity, playlists, screens } from "../data/mockSignageData";
import "../styles/dashboard.css";

function DashboardPage() {
  const onlineScreens = screens.filter((screen) => screen.status === "online");
  const attentionScreens = screens.filter(
    (screen) => screen.status === "warning" || screen.status === "offline",
  );

  const primaryPlaylist = playlists.find(
    (playlist) => playlist.id === "playlist-morning-office",
  );

  return (
    <div className="dashboard-page">
      <section className="page-heading">
        <div>
          <p className="section-eyebrow">Operations overview</p>
          <h1>Overview</h1>
          <p className="page-heading__description">
            Monitor screen health, playlist delivery, and recent player
            activity.
          </p>
        </div>

        <button className="primary-button" type="button">
          + Add display
        </button>
      </section>

      <section aria-label="Network summary" className="metrics-grid">
        <MetricCard
          detail="Registered across all locations"
          label="Total Displays"
          tone="default"
          value={screens.length}
        />
        <MetricCard
          detail="Checking in normally"
          label="Online"
          tone="success"
          value={onlineScreens.length}
        />
        <MetricCard
          detail="Need review or reconnection"
          label="Needs Attention"
          tone="warning"
          value={attentionScreens.length}
        />
        <MetricCard
          detail="Currently available to publish"
          label="Active Playlists"
          tone="default"
          value={playlists.length}
        />
      </section>

      <section className="dashboard-grid">
        <ScreenNetworkCard screens={screens} />
        <ActivePlaylistCard playlist={primaryPlaylist} screens={screens} />
      </section>

      <ActivityFeed activity={deviceActivity} />
    </div>
  );
}

export default DashboardPage;
