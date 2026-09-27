import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import songs from '../data/songs';
import useLocalStorage from '../hooks/useLocalStorage';

const PlayerContext = createContext(null);

const defaultRepeat = 'off';
const defaultVolume = 0.7;
const startingPlaylists = [
  {
    id: 'chill-nights',
    name: 'Chill Nights',
    description: 'Slow-burn grooves for the end of the day.',
    cover: '/music/covers/chill-nights.svg',
    songs: [1, 9, 5, 6],
  },
  {
    id: 'focus-mode',
    name: 'Focus Mode',
    description: 'Clean soundscapes to help you lock in.',
    cover: '/music/covers/focus-mode.svg',
    songs: [5, 6, 2, 7],
  },
  {
    id: 'workout',
    name: 'Workout',
    description: 'High-energy beats with momentum.',
    cover: '/music/covers/workout.svg',
    songs: [3, 8, 7, 2],
  },
  {
    id: 'late-night',
    name: 'Late Night',
    description: 'Dreamy synth lines and twilight vibes.',
    cover: '/music/covers/late-night.svg',
    songs: [1, 4, 10, 9],
  },
  {
    id: 'afro-vibes',
    name: 'Afro Vibes',
    description: 'Warm percussion and melodic rhythm.',
    cover: '/music/covers/afro-vibes.svg',
    songs: [4, 10, 2, 1],
  },
];

export function PlayerProvider({ children }) {
  const [songList] = useState(() => songs.map((song) => ({ ...song, favorite: Boolean(song.favorite) })));
  const [currentSongId, setCurrentSongId] = useState(songList[0]?.id ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(defaultVolume);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(defaultRepeat);
  const [favorites, setFavorites] = useLocalStorage('vibe-favorites', []);
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage('vibe-recently-played', []);
  const [playlists, setPlaylists] = useLocalStorage('vibe-playlists', startingPlaylists);
  const [error, setError] = useState('');
  const audioRef = useRef(null);

  const currentSong = useMemo(
    () => songList.find((song) => song.id === currentSongId) || songList[0],
    [songList, currentSongId],
  );

  const safeSetVolume = useCallback((nextVolume) => {
    const clamped = Math.min(1, Math.max(0, Number(nextVolume) || 0));
    setVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    setIsMuted(clamped === 0);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.volume = isMuted ? 0 : volume;
      audioRef.current = audio;
    }

    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const handleLoadedMetadata = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => setError('Audio playback failed.'));
        return;
      }

      if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * songList.length);
        const nextSong = songList[randomIndex];
        setCurrentSongId(nextSong.id);
        setCurrentTime(0);
        setIsPlaying(true);
        setRecentlyPlayed((prev) => {
          const next = prev.filter((id) => id !== nextSong.id);
          next.unshift(nextSong.id);
          return next.slice(0, 10);
        });
        return;
      }

      const currentIndex = songList.findIndex((song) => song.id === currentSongId);
      const nextIndex = currentIndex >= songList.length - 1 ? 0 : currentIndex + 1;
      const nextSong = songList[nextIndex];
      setCurrentSongId(nextSong.id);
      setCurrentTime(0);
      setIsPlaying(true);
      setRecentlyPlayed((prev) => {
        const next = prev.filter((id) => id !== nextSong.id);
        next.unshift(nextSong.id);
        return next.slice(0, 10);
      });
    };

    const handleError = () => {
      setError('This track could not be loaded. Please try another song.');
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentSongId, isMuted, isShuffle, repeatMode, songList, setRecentlyPlayed]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const source = currentSong.audio || '';
    if (!source) {
      setError('No audio file assigned for this track.');
      setIsPlaying(false);
      return;
    }

    if (audio.src !== source) {
      audio.src = source;
      audio.load();
    }

    if (isPlaying) {
      audio.play().catch(() => {
        setError('Audio playback failed. Please try another song.');
        setIsPlaying(false);
      });
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const addToRecentlyPlayed = useCallback((songId) => {
    setRecentlyPlayed((prev) => {
      const next = prev.filter((id) => id !== songId);
      next.unshift(songId);
      return next.slice(0, 10);
    });
  }, [setRecentlyPlayed]);

  const playSong = useCallback((songId) => {
    if (!songId) return;
    setCurrentSongId(songId);
    setCurrentTime(0);
    setIsPlaying(true);
    addToRecentlyPlayed(songId);
  }, [addToRecentlyPlayed]);

  const toggleFavorite = useCallback((songId) => {
    setFavorites((prev) => {
      const next = prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId];
      return next;
    });
  }, [setFavorites]);

  const togglePlay = useCallback(() => {
    if (!currentSong) return;

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef.current && currentSong.audio && audioRef.current.src !== currentSong.audio) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.load();
    }

    audioRef.current?.play().then(() => {
      setIsPlaying(true);
      addToRecentlyPlayed(currentSong.id);
    }).catch(() => {
      setError('This track could not be played.');
    });
  }, [addToRecentlyPlayed, currentSong, isPlaying]);

  const chooseRandomSong = useCallback(() => {
    if (!songList.length) return;
    let nextSong = songList[Math.floor(Math.random() * songList.length)];
    if (songList.length > 1) {
      while (nextSong.id === currentSongId) {
        nextSong = songList[Math.floor(Math.random() * songList.length)];
      }
    }
    setCurrentSongId(nextSong.id);
    setCurrentTime(0);
    setIsPlaying(true);
    addToRecentlyPlayed(nextSong.id);
  }, [addToRecentlyPlayed, currentSongId, songList]);

  const goToNextSong = useCallback(() => {
    if (!songList.length) return;
    const currentIndex = songList.findIndex((song) => song.id === currentSongId);
    const nextIndex = currentIndex >= songList.length - 1 ? 0 : currentIndex + 1;
    const nextSong = songList[nextIndex];
    setCurrentSongId(nextSong.id);
    setCurrentTime(0);
    setIsPlaying(true);
    addToRecentlyPlayed(nextSong.id);
  }, [addToRecentlyPlayed, currentSongId, songList]);

  const goToPreviousSong = useCallback(() => {
    if (!songList.length) return;
    const currentIndex = songList.findIndex((song) => song.id === currentSongId);
    const prevIndex = currentIndex <= 0 ? songList.length - 1 : currentIndex - 1;
    const previousSong = songList[prevIndex];
    setCurrentSongId(previousSong.id);
    setCurrentTime(0);
    setIsPlaying(true);
    addToRecentlyPlayed(previousSong.id);
  }, [addToRecentlyPlayed, currentSongId, songList]);

  const seekTo = useCallback((nextTime) => {
    const audio = audioRef.current;
    if (!audio) return;
    const safeTime = Math.min(Math.max(nextTime, 0), duration || nextTime);
    audio.currentTime = safeTime;
    setCurrentTime(safeTime);
  }, [duration]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const cycleRepeatMode = useCallback(() => {
    const modes = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  }, [repeatMode]);

  const toggleShuffle = useCallback(() => setIsShuffle((prev) => !prev), []);

  const playlistSongs = useCallback((playlistId) => {
    const playlist = playlists.find((item) => item.id === playlistId);
    if (!playlist) return [];
    return playlist.songs
      .map((songId) => songList.find((song) => song.id === songId))
      .filter(Boolean);
  }, [playlists, songList]);

  const playPlaylist = useCallback((playlistId) => {
    const songsInPlaylist = playlistSongs(playlistId);
    if (songsInPlaylist.length) {
      playSong(songsInPlaylist[0].id);
    }
  }, [playSong, playlistSongs]);

  const value = useMemo(() => ({
    songList,
    currentSong,
    currentSongId,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isShuffle,
    repeatMode,
    favorites,
    recentlyPlayed,
    playlists,
    error,
    playSong,
    togglePlay,
    toggleFavorite,
    addToRecentlyPlayed,
    goToNextSong,
    goToPreviousSong,
    chooseRandomSong,
    seekTo,
    setVolume: safeSetVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
    setPlaylists,
    playPlaylist,
    playlistSongs,
    clearError: () => setError(''),
    audioRef,
  }), [
    addToRecentlyPlayed,
    chooseRandomSong,
    cycleRepeatMode,
    currentSong,
    currentSongId,
    currentTime,
    duration,
    error,
    favorites,
    goToNextSong,
    goToPreviousSong,
    isMuted,
    isPlaying,
    isShuffle,
    playPlaylist,
    playSong,
    playlistSongs,
    playlists,
    recentlyPlayed,
    repeatMode,
    safeSetVolume,
    seekTo,
    setPlaylists,
    songList,
    toggleFavorite,
    toggleMute,
    togglePlay,
    toggleShuffle,
    volume,
  ]);

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
