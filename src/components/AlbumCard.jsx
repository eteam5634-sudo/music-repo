import { Play } from 'lucide-react';

export default function AlbumCard({ title, artist, cover, onPlay }) {
  return (
    <article className="album-card">
      <img className="card-cover" src={cover} alt={`${title} album cover`} />
      <div>
        <h4>{title}</h4>
        <div className="meta-text">{artist}</div>
      </div>
      <div className="card-actions">
        <button type="button" className="primary-btn" onClick={onPlay} aria-label={`Play ${title}`}>
          <Play size={16} fill="currentColor" />
        </button>
      </div>
    </article>
  );
}
