import { SpotifyAPI, TrackSimplified } from '@statsfm/spotify.js';
// import { writeFile } from 'fs/promises';

const api = new SpotifyAPI({
  clientCredentials: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  },
});

type Final = {
  name: string;
  album?: string;
  albumId?: string;
  artwork?: string;
  duration_ms: number;
  spotifyId?: string;
};

async function getTracks(): Promise<Final[]> {
  console.log('getting coldplay tracks...');

  const final: Final[] = [];
  // get total albums length
  const totalAlbums = await api.artists
    .albums('4gzpq5DPGxSnKTe4SA8HAU', {
      include: {
        compilation: false,
        album: true,
        single: true,
        appears_on: false,
      },
      limit: 1,
      market: 'US',
    })
    .then((res) => res.total);

  const albums = [];

  console.log('getting all albums...');

  // get all albums
  for (let i = 0; i < totalAlbums; i += 50) {
    const a = await api.artists.albums('4gzpq5DPGxSnKTe4SA8HAU', {
      include: {
        compilation: false,
        album: true,
        single: true,
        appears_on: false,
      },
      market: 'US',
      limit: 50,
      offset: i,
    });
    albums.push(...a.items);
  }

  const tracks: Array<TrackSimplified & { albumName: string; albumId: string; artwork: string }> = [];

  console.log('getting all tracks...');

  // get all tracks
  for (let i = 0; i < albums.length; i++) {
    console.log(`${i}/${albums.length} (${Math.round((i / albums.length) * 100)}%)`);

    const album = albums[i];

    if (album.name?.toLowerCase().includes('live')) continue;

    const t = await api.albums.tracks(albums[i].id, { market: 'US' });

    t.items.forEach((item) => {
      if (item.name.toLowerCase().includes('live')) return;

      tracks.push({ ...item, albumName: album.name as string, albumId: album.id, artwork: album.images[0].url });
    });
  }

  console.log('filtering tracks');

  // filter based on name
  const uniqueTracks = tracks.filter((value, index, self) => index === self.findIndex((t) => t.name === value.name));

  // format data
  const MOTS: { [name: string]: string } = {
    '🪐': 'Music Of The Spheres',
    '✨': 'Alien Choir',
    '❤️': 'Human Heart',
    '🌎': 'Music Of The Spheres II',
    '♾': 'Infinity Sign',
  };

  uniqueTracks.forEach((track) => {
    let name = track.name;

    if (MOTS[name]) name = MOTS[name];

    const nameLowercase = track.name.toLowerCase();
    if (
      nameLowercase.includes('trailer') ||
      nameLowercase.includes('instrumental') ||
      nameLowercase.includes('mix') ||
      nameLowercase.includes('live') ||
      nameLowercase.includes('remix') ||
      nameLowercase.includes('acoustic') ||
      nameLowercase.includes('radio') ||
      name === 'Shiver (Jo Whiley Lunchtime Social)' ||
      name === 'Talk - Francois K Dub' ||
      track.id === '45PqOIkZ9PdCjsCJQYzx9G'
    ) {
      return;
    }

    if (name === "Everything's Not Lost - Includes Hidden Track 'Life Is For Living'") name = "Everything's Not Lost";
    if (name === 'Atlas - From “The Hunger Games: Catching Fire” Soundtrack') name = 'Atlas';
    if (name === 'بنی آدم') name = 'Bani Adam';
    if (name === 'U.F.O') name = 'UFO';
    if (name === 'A L I E N S') name = 'ALIENS';
    if (name === 'Èkó') name = 'Eko';
    if (name === 'O - Reprise') name = 'O (Reprise)';
    if (track.albumName === "Viva La Vida (Prospekt's March Edition)") track.albumName = 'Viva La Vida';

    return final.push({
      name,
      duration_ms: track.duration_ms,
      spotifyId: track.id,
      album: track.albumName,
      albumId: track.albumId,
      artwork: track.artwork,
    });
  });

  // unreleased easter eggs
  final.push(
    { name: 'The Race', duration_ms: 180000 },
    { name: 'Life Is For Living', duration_ms: 180000 },
    { name: 'X Marks The Spot', duration_ms: 180000 },
    { name: 'Reign of Love', duration_ms: 180000 },
    { name: 'Chinese Sleep Chant', duration_ms: 180000 }
  );

  console.log(`${final.length} tracks`);

  // writeFile('tracks.json', JSON.stringify(final, null, ' '), {
  //   encoding: 'utf-8',
  // });

  return final;
}

export default getTracks;
