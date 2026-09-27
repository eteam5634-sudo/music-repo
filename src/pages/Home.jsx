import { usePlayer } from '../context/PlayerContext';
import FeaturedSong from '../components/FeaturedSong';
import SongCard from '../components/SongCard';
import PlaylistCard from '../components/PlaylistCard';
import EmptyState from '../components/EmptyState';
import GospelCollection from '../components/GospelCollection';
import audiomackSongs from '../data/audiomackSongs';

export default function Home() {
  const { songList, playlists, recentlyPlayed, playPlaylist } = usePlayer();
  const featuredSong = songList[0];
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
        <div className="eyebrow">Good evening</div>
        <h1>Discover your favorite music and enjoy the moment.</h1>
      </div>

      {featuredSong && <FeaturedSong song={featuredSong} />}

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
        <EmptyState title="Recently played" message="Your recently played songs will appear here." />
      )}

      <div className="section-header">
        <h3>Popular Songs</h3>
      </div>
      <div className="song-list">
        {songList.slice(0, 5).map((song, index) => (
          <div key={song.id} className="list-item">
            <span className="list-index">{index + 1}</span>
            <img className="list-cover" src={song.cover} alt={`${song.title} album cover`} />
            <div>
              <div className="list-title">{song.title}</div>
              <div className="list-subtitle">{song.artist}</div>
            </div>
            <div className="list-subtitle album-name">{song.album}</div>
            <div className="list-duration">{song.duration}</div>
            <button type="button" className="small-action icon-btn" aria-label={`Play ${song.title}`}>
              ▶
            </button>
            <button type="button" className="small-action icon-btn" aria-label={`More options for ${song.title}`}>
              ⋯
            </button>
          </div>
        ))}
      </div>

      <GospelCollection />

      <div className="section-header">
        <h3>Recommended Playlists</h3>
      </div>
      {playlists.length ? (
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onOpen={() => {}}
              onPlay={() => playPlaylist(playlist.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="No playlists yet" message="Add a few playlists to build your mood library." />
      )}
    </div>
  );
}
