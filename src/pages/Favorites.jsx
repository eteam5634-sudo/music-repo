import { usePlayer } from '../context/PlayerContext';
import SongCard from '../components/SongCard';
import EmptyState from '../components/EmptyState';
import audiomackSongs from '../data/audiomackSongs';

export default function Favorites() {
  const { songList, favorites } = usePlayer();
  const favoriteSongs = [
    ...songList.filter((song) => favorites.includes(song.id)),
    ...audiomackSongs.filter((song) => favorites.includes(song.id)),
  ];

  return (
    <div className="page main-content">
      <div className="page-header">
        <h1>Favorites</h1>
      </div>

      {favoriteSongs.length ? (
        <div className="song-grid">
          {favoriteSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <EmptyState title="No favorite songs yet" message="Your saved favorites will appear here." />
      )}
    </div>
  );
}
