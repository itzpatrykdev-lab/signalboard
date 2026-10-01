import StatusBadge from "../StatusBadge";
import type { Playlist, SignageScreen } from "../../types/signage";
import { getPlaylistName } from "../../utils/playlistHelpers";
import { useNavigate } from "react-router-dom";

interface DisplayTableProps {
  screens: SignageScreen[];
  playlists: Playlist[];
}

function DisplayTable({ screens, playlists }: DisplayTableProps) {
  const navigate = useNavigate();
  if (screens.length === 0) {
    return (
      <section className="empty-state">
        <h2>No displays found</h2>
        <p>Try a different search term or change the status filter.</p>
      </section>
    );
  }

  return (
    <div className="display-table-wrapper">
      <table className="display-table">
        <thead>
          <tr>
            <th scope="col">Display</th>
            <th scope="col">Location</th>
            <th scope="col">Playlist</th>
            <th scope="col">Last check-in</th>
            <th scope="col">Status</th>
          </tr>
        </thead>

        <tbody>
          {screens.map((screen) => (
            <tr
              className="display-table__row"
              key={screen.id}
              onClick={() => navigate(`/screens/${screen.id}`)}
            >
              <td>
                <span className="display-table__screen-name">
                  {screen.name}
                </span>
                <span className="display-table__screen-id">{screen.id}</span>
              </td>
              <td>{screen.location}</td>
              <td>{getPlaylistName(screen.activePlaylistId, playlists)}</td>
              <td>{screen.lastSeenLabel}</td>
              <td>
                <StatusBadge status={screen.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayTable;
