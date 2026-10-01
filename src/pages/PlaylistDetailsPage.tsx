import { Link, useParams } from "react-router-dom";
import { contentItems, playlists, screens } from "../data/mockSignageData";
import { getPlaylistContent } from "../utils/contentHelpers";
import {
  contentTypeLabels,
  contentTypeSymbols,
} from "../utils/contentPresentation";
import "../styles/playlistDetails.css";

function PlaylistDetailsPage() {
  const { playlistId } = useParams<{ playlistId: string }>();

  const playlist = playlists.find((item) => item.id === playlistId);

  if (!playlist) {
    return (
      <div className="playlist-details-page">
        <section className="playlist-details-not-found">
          <p className="section-eyebrow">Content delivery</p>
          <h1>Playlist not found</h1>
          <p>No SignalBoard playlist matches the requested identifier.</p>

          <Link
            className="secondary-button playlist-details-not-found__link"
            to="/playlists"
          >
            Back to playlists
          </Link>
        </section>
      </div>
    );
  }

  const playlistContent = getPlaylistContent(
    playlist.contentItemIds,
    contentItems,
  );

  const assignedScreens = screens.filter(
    (screen) => screen.activePlaylistId === playlist.id,
  );

  return (
    <div className="playlist-details-page">
      <Link className="back-link" to="/playlists">
        ← Back to playlists
      </Link>

      <section className="playlist-details-heading">
        <div>
          <p className="section-eyebrow">Playlist details</p>
          <h1>{playlist.name}</h1>
          <p className="page-heading__description">{playlist.description}</p>
        </div>

        <span className="playlist-details-heading__status">
          {assignedScreens.length > 0 ? "Published" : "Draft"}
        </span>
      </section>

      <section className="playlist-details-summary">
        <article className="playlist-details-summary__card">
          <p>Content items</p>
          <strong>{playlistContent.length}</strong>
        </article>

        <article className="playlist-details-summary__card">
          <p>Assigned displays</p>
          <strong>{assignedScreens.length}</strong>
        </article>

        <article className="playlist-details-summary__card">
          <p>Last updated</p>
          <strong className="playlist-details-summary__date">
            {playlist.updatedAtLabel}
          </strong>
        </article>
      </section>

      <section className="playlist-details-card">
        <div className="playlist-details-card__header">
          <div>
            <p className="section-eyebrow">Playback queue</p>
            <h2>Content sequence</h2>
          </div>

          <span className="playlist-details-card__count">
            {playlistContent.length} items
          </span>
        </div>

        <div className="playlist-content-list">
          {playlistContent.map((item, index) => (
            <article className="playlist-content-list__item" key={item.id}>
              <span className="playlist-content-list__position">
                {index + 1}
              </span>

              <span
                className="playlist-content-list__type"
                style={{ backgroundColor: item.accentColor }}
              >
                {contentTypeSymbols[item.type]}
              </span>

              <div className="playlist-content-list__details">
                <h3>{item.title}</h3>
                <p>
                  {contentTypeLabels[item.type]} · {item.durationSeconds}s
                </p>
              </div>

              <span className="playlist-content-list__status">
                {item.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="playlist-details-card">
        <div className="playlist-details-card__header">
          <div>
            <p className="section-eyebrow">Publishing targets</p>
            <h2>Assigned displays</h2>
          </div>

          <span className="playlist-details-card__count">
            {assignedScreens.length} displays
          </span>
        </div>

        {assignedScreens.length > 0 ? (
          <div className="playlist-display-list">
            {assignedScreens.map((screen) => (
              <article className="playlist-display-list__item" key={screen.id}>
                <div>
                  <h3>{screen.name}</h3>
                  <p>
                    {screen.location} · Last seen {screen.lastSeenLabel}
                  </p>
                </div>

                <div className="playlist-display-list__actions">
                  <span
                    className={`playlist-display-list__status playlist-display-list__status--${screen.status}`}
                  >
                    {screen.status}
                  </span>

                  <a
                    className="text-button"
                    href={`/player/${screen.id}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Preview ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="playlist-details-empty-state">
            <p>
              This playlist has not been assigned to a display yet. Assign it to
              a screen before publishing.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default PlaylistDetailsPage;
