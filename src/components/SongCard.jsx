import { Play, Heart } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function SongCard({ song }) {
  const { playSong, toggleFavorite, addToRecentlyPlayed, favorites } = usePlayer();
  const isFavorite = favorites.includes(song.id);

  const handleCardClick = () => {
    if (song.audiomackUrl) {
      window.open(song.audiomackUrl, '_blank', 'noopener,noreferrer');
      addToRecentlyPlayed(song.id);
      return;
    }

    playSong(song.id);
  };

  return (
    <article className="song-card" onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCardClick();
      }
    }}>
      <img className="card-cover" src={song.cover} alt={`${song.title} ${song.audiomackUrl ? 'Gospel' : 'album'} cover`} />
      <div>
        <h4>{song.title}</h4>
        <div className="meta-text">{song.artist}</div>
      </div>
      <div className="song-actions">
        <button
          type="button"
          className="primary-btn"
          onClick={(event) => {
            event.stopPropagation();
            handleCardClick();
          }}
          aria-label={song.audiomackUrl ? `Open ${song.title} on Audiomack` : `Play ${song.title}`}
        >
          <Play size={16} fill="currentColor" />
        </button>
        <button
          type="button"
          className="secondary-btn"
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(song.id);
          }}
          aria-label={isFavorite ? `Remove ${song.title} from favorites` : `Add ${song.title} to favorites`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
    </article>
  );
}
