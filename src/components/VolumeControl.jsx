import { Volume2, VolumeX } from 'lucide-react';

export default function VolumeControl({ volume, isMuted, onMuteToggle, onVolumeChange }) {
  return (
    <div className="volume-wrap">
      <button type="button" className="icon-btn" onClick={onMuteToggle} aria-label={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={(event) => onVolumeChange(Number(event.target.value))}
        className="range-input volume-slider"
        aria-label="Adjust volume"
      />
    </div>
  );
}
