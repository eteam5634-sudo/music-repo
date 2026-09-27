import { Search, Bell, X } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

export default function TopBar({ searchQuery, onSearchChange, onClearSearch, profileName, results, onSelectSong }) {
  const { songList } = usePlayer();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="search-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search songs, artists, albums, genres..."
            className="search-input"
            aria-label="Search music"
          />
          {searchQuery && (
            <button type="button" className="search-clear" onClick={onClearSearch} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="topbar-actions">
          <button type="button" className="icon-btn" aria-label="Notifications">
            <Bell size={18} />
          </button>
          <div className="profile-pill">
            <img className="avatar" src="/music/covers/profile.svg" alt="Profile avatar" />
            <span>{profileName}</span>
          </div>
        </div>
      </div>

      {searchQuery && results.length > 0 && (
        <div className="search-results-panel">
          <div className="search-results" role="listbox" aria-label="Search results">
            {results.slice(0, 6).map((song) => (
              <button
                key={song.id}
                type="button"
                className="result-item"
                onClick={() => onSelectSong(song.id)}
                title={`${song.title} by ${song.artist}`}
              >
                <img src={song.cover} alt={`${song.title} ${song.audiomackUrl ? 'gospel' : 'album'} art`} />
                <div className="result-meta">
                  <strong>{song.title}</strong>
                  <div className="meta-text">{song.artist}</div>
                </div>
                <span className="meta-text">{song.genre || (song.audiomackUrl ? 'Gospel' : 'Library')}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {searchQuery && results.length === 0 && (
        <div className="search-results-panel">
          <div className="search-results">
            <div className="empty-state" style={{ marginTop: 0 }}>
              <h3>No songs found</h3>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
