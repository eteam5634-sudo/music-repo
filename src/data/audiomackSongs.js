const createCover = (title, artist) => {
  const initials = (title || 'G')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase() || 'G';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#7c9dff"/>
          <stop offset="100%" stop-color="#9b7cff"/>
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="32" fill="#0b1220"/>
      <circle cx="200" cy="150" r="120" fill="url(#g1)" opacity="0.9"/>
      <circle cx="200" cy="150" r="86" fill="rgba(255,255,255,0.14)"/>
      <text x="200" y="220" text-anchor="middle" font-size="84" font-family="Segoe UI, Arial, sans-serif" font-weight="700" fill="#f5f7ff">${initials}</text>
      <text x="200" y="284" text-anchor="middle" font-size="20" letter-spacing="2" fill="#dfe9ff" font-family="Segoe UI, Arial, sans-serif">${(artist || 'Gospel').toUpperCase()}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const audiomackSongs = [
  {
    id: 'audiomack-1',
    title: 'ORO',
    artist: 'BBO',
    cover: createCover('ORO', 'BBO'),
    audiomackUrl: 'https://audiomack.com/officialbbo/song/oro-2',
  },
  {
    id: 'audiomack-2',
    title: 'Iwo Nikan',
    artist: 'Ojenike Anuoluwa',
    cover: createCover('Iwo Nikan', 'Ojenike Anuoluwa'),
    audiomackUrl: 'https://audiomack.com/ojenikeanuoluwa027/song/iwo-nikan-trendybeatzcom',
  },
  {
    id: 'audiomack-3',
    title: 'Apekeola Praise Jam',
    artist: 'Apekeola',
    cover: createCover('Apekeola Praise Jam', 'Apekeola'),
    audiomackUrl: 'https://audiomack.com/gurusbest/song/apekeola-praise-jam',
  },
  {
    id: 'audiomack-4',
    title: 'Kingdom Melodies 60',
    artist: 'SB Live x BBO',
    cover: createCover('Kingdom Melodies 60', 'SB Live x BBO'),
    audiomackUrl: 'https://audiomack.com/gurusbest/song/sb-live-x-bbo-kingdom-melodies-60',
  },
  {
    id: 'audiomack-5',
    title: 'Ayo De',
    artist: 'Believers Companion',
    cover: createCover('Ayo De', 'Believers Companion'),
    audiomackUrl: 'https://audiomack.com/believerscompanion/song/ayo-de-wwwbelieverscompanioncom',
  },
  {
    id: 'audiomack-6',
    title: 'Iri',
    artist: 'Sola Allyson',
    cover: createCover('Iri', 'Sola Allyson'),
    audiomackUrl: 'https://audiomack.com/gospeltrender/song/3-sola-allyson-iri',
  },
  {
    id: 'audiomack-7',
    title: 'Orun Si Ephphatha',
    artist: 'BBO',
    cover: createCover('Orun Si Ephphatha', 'BBO'),
    audiomackUrl: 'https://audiomack.com/officialbbo/song/orun-si-ephphatha',
  },
  {
    id: 'audiomack-8',
    title: 'Ipe — The Calling',
    artist: 'Oluwayanmifent',
    cover: createCover('Ipe — The Calling', 'Oluwayanmifent'),
    audiomackUrl: 'https://audiomack.com/oluwayanmifent/song/ipe-the-calling-oluwayanmifent',
  },
  {
    id: 'audiomack-9',
    title: 'Well of Healing Live',
    artist: 'Sola Allyson',
    cover: createCover('Well of Healing Live', 'Sola Allyson'),
    audiomackUrl: 'https://audiomack.com/sola-allyson/song/well-of-healing-live',
  },
  {
    id: 'audiomack-10',
    title: 'Amin',
    artist: 'BBO',
    cover: createCover('Amin', 'BBO'),
    audiomackUrl: 'https://audiomack.com/officialbbo/song/amin',
  },
  {
    id: 'audiomack-11',
    title: 'E Ti Tobi To Live',
    artist: 'EmmaOMG',
    cover: createCover('E Ti Tobi To Live', 'EmmaOMG'),
    audiomackUrl: 'https://audiomack.com/emmaomg/song/e-ti-tobi-to-live',
  },
  {
    id: 'audiomack-12',
    title: 'Wonders',
    artist: 'Heisyrn',
    cover: createCover('Wonders', 'Heisyrn'),
    audiomackUrl: 'https://audiomack.com/heisyrn/song/wonders',
  },
  {
    id: 'audiomack-13',
    title: 'More Hymns Praise Vibes Medley Live',
    artist: 'EmmaOMG',
    cover: createCover('More Hymns Praise Vibes Medley Live', 'EmmaOMG'),
    audiomackUrl: 'https://audiomack.com/emmaomg/song/more-hymns-praise-vibes-medley-live',
  },
  {
    id: 'audiomack-14',
    title: 'Sope Fun Jesu Pt.4 Live',
    artist: 'EmmaOMG',
    cover: createCover('Sope Fun Jesu Pt.4 Live', 'EmmaOMG'),
    audiomackUrl: 'https://audiomack.com/emmaomg/song/sope-fun-jesu-pt4-live',
  },
  {
    id: 'audiomack-15',
    title: 'Remember Me',
    artist: 'CityTrend',
    cover: createCover('Remember Me', 'CityTrend'),
    audiomackUrl: 'https://audiomack.com/citytrend007/song/remember-me-citytrendtvcom',
  },
];

export default audiomackSongs;
