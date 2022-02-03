import { SpotifyAPI } from "@statsfm/spotify.js";
import { writeFile } from "fs/promises";

const api = new SpotifyAPI({
  clientCredentials: {
    clientId: "b81d14706dab413999187141eaa9adff",
    clientSecret: "451a1c88a30b46ac8bf2e105a02192d9",
  },
  refreshToken:
    "AQAm4GFwhy8eYuxXcgnDPdaKGtpqfDmabM7rMjBk_jrg0q7GIqLsjZ5V4b6NPty4sm0MI4-Do0DdL4XvULndR4XezVLUKspTXSbr61i0TPBmFw0oDu2HRQVpxYPd0S5HG58",
});

(async () => {
  // get total albums length
  const totalAlbums = await api.artists
    .albums("4gzpq5DPGxSnKTe4SA8HAU", {
      include: {
        compilation: false,
        album: true,
        single: true,
        appears_on: false,
      },
      limit: 1,
      market: "US",
    })
    .then((res) => res.total);

  const albums = [];
  // get all albums
  for (let i = 0; i < totalAlbums; i += 50) {
    console.log(`${i}/${totalAlbums} (${(i / totalAlbums) * 100}%)`);

    const a = await api.artists.albums("4gzpq5DPGxSnKTe4SA8HAU", {
      include: {
        compilation: false,
        album: true,
        single: true,
        appears_on: false,
      },
      market: "US",
      limit: 50,
      offset: i,
    });
    albums.push(...a.items);
  }

  const tracks = [];

  // get all tracks
  for (let i = 0; i < albums.length; i++) {
    const name = albums[i].name;

    if (name.toLowerCase().includes("live")) continue;

    console.log(`${i}/${totalAlbums} (${(i / totalAlbums) * 100}%)`);

    const t = await api.albums.tracks(albums[i].id, { market: "US" });

    t.items.forEach((item) => {
      if (item.name.toLowerCase().includes("live")) return;

      tracks.push(item);
    });
  }

  // filter based on name
  const uniqueTracks = tracks.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.place === value.place && t.name === value.name)
  );

  console.log(uniqueTracks.length);

  // format data
  const final = [];
  const MOTS = {
    "🪐": "Music Of The Spheres I (🪐)",
    "✨": "Alien Choir (✨)",
    "❤️": "Human Heart (❤️)",
    "🌎": "Music Of The Spheres II (🌎)",
    "♾": "Infinity Sign (♾)",
  };

  uniqueTracks.forEach((track) => {
    if (MOTS[track.name]) track.name = MOTS[track.name];

    return final.push({
      name: track.name,
      duration_ms: track.duration_ms,
      spotifyId: track.id,
    });
  });

  final.push({ name: "The Race", duration_ms: 180000, spotifyId: "" });

  await writeFile("tracks.json", JSON.stringify(final, null, " "), {
    encoding: "utf-8",
  });
})();
