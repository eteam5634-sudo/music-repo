import { usePlayer } from '../context/PlayerContext';
import SongCard from '../components/SongCard';
import EmptyState from '../components/EmptyState';
import audiomackSongs from '../data/audiomackSongs';

export default function RecentlyPlayed() {
  const { songList, recentlyPlayed } = usePlayer();
  const songs = recentlyPlayed
    .map((songId) => {
      const localMatch = songList.find((song) => song.id === songId);
      if (localMatch) return localMatch;
      return audiomackSongs.find((song) => song.id === songId) || null;
    })
    .filter(Boolean);

  return (
    <div className="page main-content">
      <div className="page-header">
        <h1>Recently Played</h1>
      </div>

      {songs.length ? (
        <div className="song-grid">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <EmptyState title="No recent tracks yet" message="Your recently played songs will appear here." />
      )}
    </div>
  );
}
