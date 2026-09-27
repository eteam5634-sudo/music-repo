export default function ProgressBar({ currentTime, duration, onSeek }) {
  const current = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="progress-row">
      <span>{formatTime(currentTime)}</span>
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={(event) => onSeek(Number(event.target.value))}
        className="range-input"
        aria-label="Seek track"
      />
      <span>{formatTime(duration)}</span>
    </div>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, '0')}`;
}
