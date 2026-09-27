import { useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileNav from './components/MobileNav';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Library from './pages/Library';
import Favorites from './pages/Favorites';
import RecentlyPlayed from './pages/RecentlyPlayed';
import PlaylistPage from './pages/Playlist';
import audiomackSongs from './data/audiomackSongs';
import { PlayerProvider, usePlayer } from './context/PlayerContext';

function AppShell() {
  const [activePage, setActivePage] = useState('home');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('chill-nights');
  const [searchQuery, setSearchQuery] = useState('');
  const { songList, playlists, playSong } = usePlayer();
  const allSearchSongs = useMemo(() => [...songList, ...audiomackSongs], [songList]);

  const filteredSongs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return allSearchSongs.filter((song) =>
      [song.title, song.artist, song.album, song.genre, 'gospel'].some((value) =>
        (value || '').toLowerCase().includes(query),
      ),
    );
  }, [allSearchSongs, searchQuery]);

  const renderPage = () => {
    switch (activePage) {
      case 'discover':
        return <Discover />;
      case 'library':
        return <Library />;
      case 'favorites':
        return <Favorites />;
      case 'recently-played':
        return <RecentlyPlayed />;
      case 'playlist':
        return (
          <PlaylistPage
            playlistId={selectedPlaylistId}
            onSelectPlaylist={setSelectedPlaylistId}
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        playlists={playlists}
        onSelectPlaylist={(id) => {
          setSelectedPlaylistId(id);
          setActivePage('playlist');
        }}
      />

      <main className="main-panel">
        <TopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          profileName="Ava Stone"
          results={filteredSongs}
          onSelectSong={(songId) => {
            const selectedSong = allSearchSongs.find((song) => song.id === songId);

            if (selectedSong?.audiomackUrl) {
              window.open(selectedSong.audiomackUrl, '_blank', 'noopener,noreferrer');
              setSearchQuery('');
              setActivePage('home');
              return;
            }

            playSong(songId);
            setSearchQuery('');
            setActivePage('home');
          }}
        />

        {renderPage()}
      </main>

      <MusicPlayer />
      <MobileNav
        activePage={activePage}
        onNavigate={setActivePage}
        playlists={playlists}
        onSelectPlaylist={(id) => {
          setSelectedPlaylistId(id);
          setActivePage('playlist');
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <PlayerProvider>
      <div className="app-root">
        <AppShell />
      </div>
    </PlayerProvider>
  );
}
