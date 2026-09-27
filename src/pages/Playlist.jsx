import { usePlayer } from '../context/PlayerContext';
import SongCard from '../components/SongCard';
import EmptyState from '../components/EmptyState';

export default function PlaylistPage({ playlistId, onSelectPlaylist }) {
  const { playlists, songList, playSong } = usePlayer();
  const playlist = playlists.find((entry) => entry.id === playlistId) || playlists[0];

  if (!playlist) {
    return <EmptyState title="No playlist selected" message="Choose a playlist from the sidebar." />;
  }

  const songs = playlist.songs
    .map((songId) => songList.find((song) => song.id === songId))
    .filter(Boolean);

  return (
    <div className="page main-content">
      <div className="page-header">
        <h1>{playlist.name}</h1>
      </div>

      <div className="feature-card" style={{ marginBottom: 18 }}>
        <img className="feature-cover" src={playlist.cover} alt={`${playlist.name} cover`} />
        <div className="feature-copy">
          <div className="eyebrow">Playlist</div>
          <h2>{playlist.name}</h2>
          <div className="feature-meta">{playlist.description}</div>
          <button type="button" className="primary-btn" onClick={() => playSong(songs[0]?.id)}>
            Play all
          </button>
        </div>
      </div>

      {songs.length ? (
        <div className="song-grid">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      ) : (
        <EmptyState title="This playlist is empty" message="Add a few songs to start the vibe." />
      )}
    </div>
  );
}
