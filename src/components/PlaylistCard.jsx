import { Play, Music4 } from 'lucide-react';

export default function PlaylistCard({ playlist, onOpen, onPlay }) {
  return (
    <article className="playlist-card">
      <img className="card-cover" src={playlist.cover} alt={`${playlist.name} cover`} />
      <div>
        <h4>{playlist.name}</h4>
        <div className="meta-text">{playlist.description}</div>
      </div>
      <div className="card-actions" style={{ justifyContent: 'space-between' }}>
        <div className="meta-text"><Music4 size={14} style={{ marginRight: 6 }} /> {playlist.songs.length} songs</div>
        <button type="button" className="primary-btn" onClick={onPlay} aria-label={`Play ${playlist.name}`}>
          <Play size={16} fill="currentColor" />
        </button>
      </div>
    </article>
  );
}
