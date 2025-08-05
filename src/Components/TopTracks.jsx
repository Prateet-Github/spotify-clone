import { useEffect, useState } from "react";

export const TopTracks = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const fetchTracks = async () => {
      try {
        const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=10", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTracks(data.items || []);
      } catch (err) {
        console.error("Failed to fetch top tracks", err);
      }
    };

    fetchTracks();
  }, []);

  return (
    <div className="p-4 bg-[#121212]">
      <h2 className="text-5xl text-white font-bold mb-2">Your Top Tracks</h2>
      <ul className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4">
        {tracks.map((track) => (
          <li key={track.id} className="bg-gray-400 p-3 rounded">
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="rounded mb-2  h-10 w-10"
            />
            <p className="font-medium">{track.name}</p>
            <p className="text-sm text-gray-500">{track.artists[0].name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};