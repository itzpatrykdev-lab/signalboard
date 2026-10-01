import { Link, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import {
  contentItems,
  deviceActivity,
  playlists,
  screens,
} from "../data/mockSignageData";
import { getPlaylistContent } from "../utils/contentHelpers";
import {
  contentTypeLabels,
  contentTypeSymbols,
} from "../utils/contentPresentation";
import { getPlaylistName } from "../utils/playlistHelpers";
import "../styles/screenDetails.css";

function ScreenDetailsPage() {
  const { screenId } = useParams<{ screenId: string }>();

  const screen = screens.find((item) => item.id === screenId);

  if (!screen) {
    return (
      <div className="screen-details-page">
        <section className="details-not-found">
          <p className="section-eyebrow">Display management</p>
          <h1>Display not found</h1>
          <p>No SignalBoard display matches the requested identifier.</p>

          <Link
            className="secondary-button details-not-found__link"
            to="/screens"
          >
            Back to displays
          </Link>
        </section>
      </div>
    );
  }

  const playlist = playlists.find(
    (item) => item.id === screen.activePlaylistId,
  );

  const assignedContent = playlist
    ? getPlaylistContent(playlist.contentItemIds, contentItems)
    : [];

  const screenActivity = deviceActivity.filter(
    (event) => event.screenId === screen.id,
  );

  return (
    <div className="screen-details-page">
      <Link className="back-link" to="/screens">
        ← Back to displays
      </Link>

      <section className="screen-details-heading">
        <div>
          <p className="section-eyebrow">Display details</p>

          <div className="screen-details-heading__title-row">
            <h1>{screen.name}</h1>
            <StatusBadge status={screen.status} />
          </div>

          <p className="page-heading__description">
            {screen.location} · Last check-in {screen.lastSeenLabel}
          </p>
        </div>

        <a
          className="primary-button"
          href={`/player/${screen.id}`}
          rel="noreferrer"
          target="_blank"
        >
          Preview player ↗
        </a>
      </section>

      <section className="screen-details-grid">
        <article className="details-card details-card--playlist">
          <p className="section-eyebrow">Assigned playlist</p>
          <h2>{getPlaylistName(screen.activePlaylistId, playlists)}</h2>

          {playlist ? (
            <>
              <p className="details-card__description">
                {playlist.description}
              </p>

              <div className="details-card__metadata">
                <span>{assignedContent.length} content items</span>
                <span>{playlist.updatedAtLabel}</span>
              </div>
            </>
          ) : (
            <p className="details-card__description">
              Assign a playlist to this display before publishing content.
            </p>
          )}
        </article>

        <article className="details-card">
          <p className="section-eyebrow">Player health</p>
          <h2>
            {screen.status === "online" ? "Operating normally" : "Needs review"}
          </h2>

          <p className="details-card__description">
            The display was last seen {screen.lastSeenLabel}.
          </p>

          <div className="details-card__metadata">
            <span>Player ID: {screen.id}</span>
          </div>
        </article>
      </section>

      <section className="details-card">
        <div className="details-card__header">
          <div>
            <p className="section-eyebrow">Playback queue</p>
            <h2>Playlist content</h2>
          </div>

          {playlist && (
            <span className="details-card__count">
              {assignedContent.length} items
            </span>
          )}
        </div>

        {playlist ? (
          <div className="playback-list">
            {assignedContent.map((item, index) => (
              <article className="playback-list__item" key={item.id}>
                <span className="playback-list__position">{index + 1}</span>

                <span
                  className="playback-list__type"
                  style={{ backgroundColor: item.accentColor }}
                >
                  {contentTypeSymbols[item.type]}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>
                    {contentTypeLabels[item.type]} · {item.durationSeconds}s
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="details-empty-state">
            <p>
              This display has no content queue because no playlist is assigned.
            </p>
          </div>
        )}
      </section>

      <section className="details-card">
        <div className="details-card__header">
          <div>
            <p className="section-eyebrow">Recent telemetry</p>
            <h2>Display activity</h2>
          </div>
        </div>

        {screenActivity.length > 0 ? (
          <div className="details-activity-list">
            {screenActivity.map((event) => (
              <article className="details-activity-item" key={event.id}>
                <div>
                  <h3>
                    {event.type === "heartbeat"
                      ? "Heartbeat received"
                      : event.type === "playlist-updated"
                        ? "Playlist updated"
                        : "Connection lost"}
                  </h3>
                  <p>{event.screenName}</p>
                </div>

                <time>{event.occurredAtLabel}</time>
              </article>
            ))}
          </div>
        ) : (
          <div className="details-empty-state">
            <p>No recent activity has been recorded for this display.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default ScreenDetailsPage;
