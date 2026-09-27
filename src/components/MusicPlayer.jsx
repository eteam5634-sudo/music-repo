import { MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import PlayerControls from './PlayerControls';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    error,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
    togglePlay,
    goToPreviousSong,
    goToNextSong,
    seekTo,
  } = usePlayer();

  if (!currentSong) {
    return null;
  }

  const compactPlayer = (
    <div className="music-player compact" aria-label="Compact music player">
      <div className="compact-player" onClick={togglePlay} role="button" tabIndex={0}>
        <img className={`player-art ${isPlaying ? 'playing' : ''}`} src={currentSong.cover} alt={`${currentSong.title} album cover`} />
        <div className="now-playing">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>
      <div className="compact-actions">
        <button type="button" className="control-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="control-btn" onClick={goToNextSong} aria-label="Next song">
          Next
        </button>
      </div>
    </div>
  );

  const fullPlayer = (
    <div className="music-player" aria-label="Music player">
      <div className="player-shell">
        <div className="player-track">
          <img className={`player-art ${isPlaying ? 'playing' : ''}`} src={currentSong.cover} alt={`${currentSong.title} album cover`} />
          <div className="now-playing">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>

        <div className="player-center">
          <PlayerControls
            isPlaying={isPlaying}
            isShuffle={isShuffle}
            repeatMode={repeatMode}
            onPlayPause={togglePlay}
            onPrevious={goToPreviousSong}
            onNext={goToNextSong}
            onToggleShuffle={toggleShuffle}
            onCycleRepeat={cycleRepeatMode}
          />
          <ProgressBar currentTime={currentTime} duration={duration || 0} onSeek={seekTo} />
          {error && (
            <div className="meta-text" style={{ color: '#ffb3b3', marginTop: 6 }} aria-live="polite">
              {error}
            </div>
          )}
        </div>

        <div className="volume-wrap">
          <button type="button" className="icon-btn" aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onMuteToggle={toggleMute}
            onVolumeChange={setVolume}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {compactPlayer}
      {fullPlayer}
    </>
  );
}
