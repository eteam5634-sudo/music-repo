import { Pause, Play, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';

export default function PlayerControls({
  isPlaying,
  isShuffle,
  repeatMode,
  onPlayPause,
  onPrevious,
  onNext,
  onToggleShuffle,
  onCycleRepeat,
}) {
  return (
    <div className="control-buttons">
      <button type="button" className="control-btn" onClick={onToggleShuffle} aria-label="Toggle shuffle" style={{ color: isShuffle ? 'var(--accent)' : 'inherit' }}>
        <Shuffle size={16} />
      </button>
      <button type="button" className="control-btn" onClick={onPrevious} aria-label="Previous song">
        <SkipBack size={18} />
      </button>
      <button type="button" className="control-btn primary" onClick={onPlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </button>
      <button type="button" className="control-btn" onClick={onNext} aria-label="Next song">
        <SkipForward size={18} />
      </button>
      <button type="button" className="control-btn" onClick={onCycleRepeat} aria-label="Cycle repeat mode" style={{ color: repeatMode !== 'off' ? 'var(--accent)' : 'inherit' }}>
        <Repeat size={16} />
        {repeatMode !== 'off' && <span style={{ fontSize: 10, marginLeft: 4 }}>{repeatMode === 'all' ? 'A' : '1'}</span>}
      </button>
    </div>
  );
}
