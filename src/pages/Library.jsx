import { usePlayer } from '../context/PlayerContext';
import SongCard from '../components/SongCard';
import PlaylistCard from '../components/PlaylistCard';
import EmptyState from '../components/EmptyState';
import audiomackSongs from '../data/audiomackSongs';

export default function Library() {
  const { favorites, recentlyPlayed, playlists, songList, playPlaylist } = usePlayer();

  const favoriteSongs = [
    ...songList.filter((song) => favorites.includes(song.id)),
    ...audiomackSongs.filter((song) => favorites.includes(song.id)),
  ];
  const recentSongs = recentlyPlayed
    .map((songId) => {
      const localMatch = songList.find((song) => song.id === songId);
      if (localMatch) return localMatch;
      return audiomackSongs.find((song) => song.id === songId) || null;
    })
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="page main-content">
      <div className="page-header">
        <h1>Your Library</h1>
      </div>

      <div className="section-header">
        <h3>Recently Played</h3>
      </div>
      {recentSongs.length ? (
        <div className="song-grid">
          {recentSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <EmptyState title="No recent tracks" message="Your recently played songs will appear here." />
      )}

      <div className="section-header">
        <h3>Favorites</h3>
      </div>
      {favoriteSongs.length ? (
        <div className="song-grid">
          {favoriteSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <EmptyState title="No favorite songs yet" message="Tap the heart on any track to save it here." />
      )}

      <div className="section-header">
        <h3>Playlists</h3>
      </div>
      {playlists.length ? (
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} onOpen={() => {}} onPlay={() => playPlaylist(playlist.id)} />
          ))}
        </div>
      ) : (
        <EmptyState title="No playlists yet" message="Create playlists to match every mood." />
      )}
    </div>
  );
}
