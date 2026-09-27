import { Heart, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function FeaturedSong({ song }) {
  const { playSong, toggleFavorite, favorites } = usePlayer();
  const isFavorite = favorites.includes(song.id);

  return (
    <section className="feature-card" aria-label="Featured song">
      <div className="feature-cover-wrap">
        <img className="feature-cover" src={song.cover} alt={`${song.title} album cover`} />
      </div>

      <div className="feature-copy">
        <div className="eyebrow">Featured</div>
        <h1>{song.title}</h1>
        <div className="feature-meta">
          <div>{song.artist}</div>
          <div>{song.album}</div>
        </div>

        <div className="feature-actions">
          <button type="button" className="primary-btn" onClick={() => playSong(song.id)} aria-label={`Play ${song.title}`}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Play size={18} fill="currentColor" /> Play now
            </span>
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => toggleFavorite(song.id)}
            aria-label={isFavorite ? `Remove ${song.title} from favorites` : `Add ${song.title} to favorites`}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} /> Favorite
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
