import type { DeviceActivity } from '../../types/signage';

interface ActivityFeedProps {
  activity: DeviceActivity[];
}

const activityCopy = {
  heartbeat: 'Heartbeat received',
  'playlist-updated': 'Playlist updated',
  'connection-lost': 'Connection lost',
};

function ActivityFeed({ activity }: ActivityFeedProps) {
  return (
    <section className="dashboard-card activity-feed">
      <div className="dashboard-card__header">
        <div>
          <p className="section-eyebrow">Real-time events</p>
          <h2>Live Device Activity</h2>
        </div>
      </div>

      <div className="activity-feed__list">
        {activity.map((event) => (
          <article className="activity-feed__item" key={event.id}>
            <span
              className={`activity-feed__indicator activity-feed__indicator--${event.type}`}
            />

            <div className="activity-feed__content">
              <p className="activity-feed__screen-name">{event.screenName}</p>
              <p className="activity-feed__message">{activityCopy[event.type]}</p>
            </div>

            <time className="activity-feed__time">{event.occurredAtLabel}</time>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ActivityFeed;