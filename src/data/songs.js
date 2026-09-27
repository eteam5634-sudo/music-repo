const makeToneDataUri = (seed) => {
  const sampleRate = 22050;
  const duration = 2.8;
  const amplitude = 0.35;
  const totalSamples = Math.floor(sampleRate * duration);
  const dataSize = totalSamples * 2;
  const bytes = new Uint8Array(44 + dataSize);
  const view = new DataView(bytes.buffer);

  const writeAscii = (offset, value) => {
    for (let i = 0; i < value.length; i += 1) {
      bytes[offset + i] = value.charCodeAt(i);
    }
  };

  writeAscii(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeAscii(8, 'WAVE');
  writeAscii(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeAscii(36, 'data');
  view.setUint32(40, dataSize, true);

  const baseFreq = 110 + seed * 44;
  for (let i = 0; i < totalSamples; i += 1) {
    const t = i / sampleRate;
    const wave = Math.sin(2 * Math.PI * baseFreq * t)
      + 0.5 * Math.sin(2 * Math.PI * (baseFreq * 1.5) * t)
      + 0.25 * Math.sin(2 * Math.PI * (baseFreq / 2) * t);
    const envelope = 0.5 - 0.5 * Math.cos(2 * Math.PI * (t / duration));
    const sample = Math.max(-1, Math.min(1, wave * amplitude * envelope));
    const value = Math.max(-32768, Math.min(32767, Math.round(sample * 32767)));
    view.setInt16(44 + i * 2, value, true);
  }

  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return `data:audio/wav;base64,${btoa(binary)}`;
};

export const songs = [
  {
    id: 1,
    title: 'Midnight Drive',
    artist: 'Nova',
    album: 'After Dark',
    cover: '/music/covers/midnight-drive.svg',
    audio: makeToneDataUri(1),
    duration: '3:42',
    genre: 'Chill',
    favorite: false,
  },
  {
    id: 2,
    title: 'Velvet Echo',
    artist: 'Sora Lane',
    album: 'Neon Night',
    cover: '/music/covers/velvet-echo.svg',
    audio: makeToneDataUri(2),
    duration: '4:08',
    genre: 'Pop',
    favorite: false,
  },
  {
    id: 3,
    title: 'Skyline Motion',
    artist: 'Aster Bloom',
    album: 'Night Shift',
    cover: '/music/covers/skyline-motion.svg',
    audio: makeToneDataUri(3),
    duration: '3:55',
    genre: 'Workout',
    favorite: false,
  },
  {
    id: 4,
    title: 'Late Bloom',
    artist: 'Mila Hart',
    album: 'Soft Lights',
    cover: '/music/covers/late-bloom.svg',
    audio: makeToneDataUri(4),
    duration: '3:30',
    genre: 'Afro',
    favorite: false,
  },
  {
    id: 5,
    title: 'Glass Horizon',
    artist: 'Kairo',
    album: 'Blue Hour',
    cover: '/music/covers/glass-horizon.svg',
    audio: makeToneDataUri(5),
    duration: '4:21',
    genre: 'Focus',
    favorite: false,
  },
  {
    id: 6,
    title: 'Dawn Circuit',
    artist: 'Echo Vale',
    album: 'Signal',
    cover: '/music/covers/dawn-circuit.svg',
    audio: makeToneDataUri(6),
    duration: '3:46',
    genre: 'New Releases',
    favorite: false,
  },
  {
    id: 7,
    title: 'Cruise Control',
    artist: 'Solar Morn',
    album: 'Afterglow',
    cover: '/music/covers/cruise-control.svg',
    audio: makeToneDataUri(7),
    duration: '3:18',
    genre: 'Trending',
    favorite: false,
  },
  {
    id: 8,
    title: 'Velvet Voltage',
    artist: 'Luna Hart',
    album: 'Electric Dreams',
    cover: '/music/covers/velvet-voltage.svg',
    audio: makeToneDataUri(8),
    duration: '4:01',
    genre: 'Workout',
    favorite: false,
  },
  {
    id: 9,
    title: 'Moonlit Notes',
    artist: 'Ari Sol',
    album: 'Slow Glow',
    cover: '/music/covers/moonlit-notes.svg',
    audio: makeToneDataUri(9),
    duration: '3:39',
    genre: 'Chill',
    favorite: false,
  },
  {
    id: 10,
    title: 'Golden Tide',
    artist: 'Rae Vale',
    album: 'Sunset Air',
    cover: '/music/covers/golden-tide.svg',
    audio: makeToneDataUri(10),
    duration: '3:52',
    genre: 'Afro',
    favorite: false,
  },
];

export default songs;
