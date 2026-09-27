import { Home, Compass, Library, Heart, History, Plus, Settings } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'favorites', label: 'Favorites', icon: Heart },
  { id: 'recently-played', label: 'Recently Played', icon: History },
];

export default function Sidebar({ activePage, onNavigate, playlists, onSelectPlaylist }) {
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div>
        <div className="logo" role="img" aria-label="VIBE logo">
          <span className="logo-mark">V</span>
          <span>VIBE</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`nav-item ${activePage === id ? 'active' : ''}`}
              onClick={() => onNavigate(id)}
              aria-label={label}
            >
              <Icon className="nav-item-icon" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-section">
          <div className="section-label">
            <span>Playlists</span>
            <Plus size={14} />
          </div>

          <div className="playlist-list">
            {playlists.map((playlist) => (
              <button
                key={playlist.id}
                type="button"
                className={`playlist-item ${activePage === 'playlist' ? 'active' : ''}`}
                onClick={() => onSelectPlaylist(playlist.id)}
              >
                <span className="playlist-indicator" aria-hidden="true">●</span>
                <span>{playlist.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-meta">
          <img className="avatar" src="/music/covers/profile.svg" alt="Profile avatar" />
          <div>
            <strong>Ava Stone</strong>
            <div className="meta-text">Premium</div>
          </div>
        </div>
        <button type="button" className="icon-btn" aria-label="Settings">
          <Settings size={16} />
        </button>
      </div>
    </aside>
  );
}
