import { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import SongCard from '../components/SongCard';

const categories = ['Trending', 'New Releases', 'Chill', 'Workout', 'Focus', 'Afro', 'Pop'];

export default function Discover() {
  const [activeCategory, setActiveCategory] = useState('Trending');
  const { songList } = usePlayer();

  const filtered = activeCategory === 'Trending'
    ? songList
    : songList.filter((song) => song.genre === activeCategory);

  return (
    <div className="page main-content">
      <div className="page-header">
        <h1>Discover Music</h1>
      </div>

      <div className="section-header">
        <h3>Categories</h3>
      </div>
      <div className="feature-actions" style={{ marginBottom: 18 }}>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`secondary-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            style={{
              background: activeCategory === category ? 'rgba(124, 157, 255, 0.16)' : 'rgba(255,255,255,0.04)',
              borderColor: activeCategory === category ? 'rgba(124, 157, 255, 0.3)' : 'rgba(255,255,255,0.08)',
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="song-grid">
        {filtered.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
