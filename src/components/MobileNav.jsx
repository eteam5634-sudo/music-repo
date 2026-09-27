import { Home, Compass, Library, Heart } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'favorites', label: 'Favorites', icon: Heart },
];

export default function MobileNav({ activePage, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          className={`mobile-nav-item ${activePage === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)}
          aria-label={label}
        >
          <Icon className="mobile-nav-icon" />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
