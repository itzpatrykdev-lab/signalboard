import type { ContentItem } from '../../types/signage';

interface PlayerSlideProps {
  item: ContentItem;
}

function PlayerSlide({ item }: PlayerSlideProps) {
  if (item.type === 'weather') {
    return (
      <section
        className="player-slide player-slide--weather"
        style={{ backgroundColor: item.accentColor }}
      >
        <p className="player-slide__eyebrow">Palos Heights, IL</p>
        <div className="player-slide__weather-content">
          <span className="player-slide__weather-icon" aria-hidden="true">
            ☀
          </span>
          <div>
            <p className="player-slide__temperature">72°</p>
            <h1>Partly Cloudy</h1>
          </div>
        </div>
        <p className="player-slide__description">
          High 76° · Low 58° · A comfortable afternoon ahead.
        </p>
      </section>
    );
  }

  if (item.type === 'calendar') {
    return (
      <section
        className="player-slide player-slide--calendar"
        style={{ backgroundColor: item.accentColor }}
      >
        <p className="player-slide__eyebrow">Today’s Schedule</p>
        <h1>What’s happening today</h1>

        <div className="player-slide__events">
          <div>
            <span>10:30 AM</span>
            <strong>Team Standup</strong>
          </div>
          <div>
            <span>1:00 PM</span>
            <strong>Training Session</strong>
          </div>
          <div>
            <span>3:30 PM</span>
            <strong>Project Review</strong>
          </div>
        </div>
      </section>
    );
  }

  if (item.type === 'image') {
    return (
      <section
        className="player-slide player-slide--image"
        style={{ backgroundColor: item.accentColor }}
      >
        <div className="player-slide__image-shape player-slide__image-shape--one" />
        <div className="player-slide__image-shape player-slide__image-shape--two" />

        <div className="player-slide__image-content">
          <p className="player-slide__eyebrow">SignalBoard</p>
          <h1>{item.title}</h1>
          <p className="player-slide__description">{item.description}</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="player-slide player-slide--announcement"
      style={{ backgroundColor: item.accentColor }}
    >
      <p className="player-slide__eyebrow">SignalBoard Update</p>
      <h1>{item.title}</h1>
      <p className="player-slide__description">{item.description}</p>

      <div className="player-slide__announcement-mark" aria-hidden="true">
        S
      </div>
    </section>
  );
}

export default PlayerSlide;