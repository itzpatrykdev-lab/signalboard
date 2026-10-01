import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlayerSlide from '../components/player/PlayerSlide';
import { contentItems, playlists, screens } from '../data/mockSignageData';
import { getPlaylistContent } from '../utils/contentHelpers';
import '../styles/player.css';

function PlayerPage() {
  const { screenId } = useParams<{ screenId: string }>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const screen = screens.find((item) => item.id === screenId);

  const playlist = useMemo(() => {
    if (!screen?.activePlaylistId) {
      return undefined;
    }

    return playlists.find((item) => item.id === screen.activePlaylistId);
  }, [screen?.activePlaylistId]);

  const playlistContent = useMemo(() => {
    if (!playlist) {
      return [];
    }

    return getPlaylistContent(playlist.contentItemIds, contentItems);
  }, [playlist]);

  const currentItem = playlistContent[currentSlideIndex];

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [screenId]);

  useEffect(() => {
    if (!currentItem || playlistContent.length <= 1) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCurrentSlideIndex((currentIndex) => {
        return (currentIndex + 1) % playlistContent.length;
      });
    }, currentItem.durationSeconds * 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [currentItem, playlistContent.length]);

  if (!screen) {
    return (
      <main className="player-message">
        <h1>Display not found</h1>
        <p>No SignalBoard display matches the ID “{screenId}”.</p>
      </main>
    );
  }

  if (!playlist) {
    return (
      <main className="player-message">
        <h1>No playlist assigned</h1>
        <p>{screen.name} is registered but does not have an active playlist.</p>
      </main>
    );
  }

  if (!currentItem) {
    return (
      <main className="player-message">
        <h1>Playlist has no available content</h1>
        <p>
          {playlist.name} cannot be displayed because its content items are
          missing or unavailable.
        </p>
      </main>
    );
  }

  return (
    <main className="player">
      <PlayerSlide item={currentItem} />

      <footer className="player__footer">
        <span className="player__brand">SIGNALBOARD</span>
        <span>{screen.name}</span>
        <span>
          {currentSlideIndex + 1} / {playlistContent.length}
        </span>
      </footer>
    </main>
  );
}

export default PlayerPage;