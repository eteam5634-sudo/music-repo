import { Heart, Music2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import audiomackSongs from '../data/audiomackSongs';
import AudiomackPlayer from './AudiomackPlayer';

export default function GospelCollection() {
  const { favorites, toggleFavorite, addToRecentlyPlayed } = usePlayer();

  const handleOpen = (song) => {
    if (!song?.audiomackUrl) return;
    window.open(song.audiomackUrl, '_blank', 'noopener,noreferrer');
    addToRecentlyPlayed(song.id);
  };

  return (
    <section className="gospel-section" aria-labelledby="gospel-collection-heading">
      <div className="section-header gospel-header">
        <div>
          <div className="eyebrow">Featured</div>
          <h3 id="gospel-collection-heading">Gospel Collection</h3>
        </div>
        <span className="section-chip">{audiomackSongs.length} songs</span>
      </div>

      <div className="gospel-grid">
        {audiomackSongs.map((song, index) => {
          const isFavorite = favorites.includes(song.id);

          return (
            <article key={song.id} className="gospel-card">
              <div className="gospel-cover-wrap">
                <img className="gospel-cover" src={song.cover} alt={`${song.title} cover art`} />
                <span className="gospel-index">{String(index + 1).padStart(2, '0')}</span>
              </div>

              <div className="gospel-body">
                <div className="gospel-meta">
                  <div>
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                  </div>
                </div>

                <AudiomackPlayer title={song.title} artist={song.artist} audiomackUrl={song.audiomackUrl} />
              </div>

              <div className="gospel-actions">
                <button
                  type="button"
                  className="secondary-btn gospel-toggle"
                  onClick={() => toggleFavorite(song.id)}
                  aria-label={isFavorite ? `Remove ${song.title} from favorites` : `Add ${song.title} to favorites`}
                >
                  <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                  {isFavorite ? 'Saved' : 'Favorite'}
                </button>

                <button
                  type="button"
                  className="secondary-btn gospel-toggle"
                  onClick={() => handleOpen(song)}
                  aria-label={`Open ${song.title} on Audiomack`}
                >
                  <Music2 size={16} />
                  Listen
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
