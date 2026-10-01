import StatusBadge from '../StatusBadge';
import type { SignageScreen } from '../../types/signage';

interface ScreenNetworkCardProps {
  screens: SignageScreen[];
}

function ScreenNetworkCard({ screens }: ScreenNetworkCardProps) {
  return (
    <section className="dashboard-card screen-network-card">
      <div className="dashboard-card__header">
        <div>
          <p className="section-eyebrow">Live overview</p>
          <h2>Screen Network</h2>
        </div>

        <span className="dashboard-card__count">{screens.length} total</span>
      </div>

      <div className="screen-network-card__dots" aria-label="Screen health status">
        {screens.map((screen) => (
          <span
            aria-label={`${screen.name}: ${screen.status}`}
            className={`screen-network-card__dot screen-network-card__dot--${screen.status}`}
            key={screen.id}
            title={`${screen.name}: ${screen.status}`}
          />
        ))}
      </div>

      <div className="screen-network-card__list">
        {screens.slice(0, 4).map((screen) => (
          <div className="screen-network-card__screen" key={screen.id}>
            <div>
              <p className="screen-network-card__screen-name">{screen.name}</p>
              <p className="screen-network-card__screen-location">
                {screen.location} · Seen {screen.lastSeenLabel}
              </p>
            </div>

            <StatusBadge status={screen.status} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScreenNetworkCard;