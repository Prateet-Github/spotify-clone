import { useState, useEffect } from "react";

export const TopArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return alert("No token found!");

      try {
        const res = await fetch("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setArtists(data.items);
      } catch (err) {
        console.error("Error fetching top artists:", err);
      }
    };

    fetchTopArtists();
  }, []);

  return (
    <div className="p-4 bg-[#121212]">
      <h2 className="text-5xl text-white font-bold mb-12 mt-2">Your Top Artists</h2>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
       {artists.map((artist) => (
  <div key={artist.id} className="bg-gray-800 text-white p-4 rounded shadow">
    {artist.images?.length > 0 && (
      <img
        src={artist.images[0].url}
        alt={artist.name}
        className="w-xl h-xl object-cover rounded"
      />
    )}
    <h2 className="text-lg font-semibold mt-2">{artist.name}</h2>
    <p className="text-sm text-gray-300">
      Followers: {artist.followers?.total?.toLocaleString?.() || "N/A"}
    </p>
    <p className="text-sm text-gray-400 mt-1">
      Genres: {artist.genres?.slice?.(0, 2).join(", ") || "N/A"}
    </p>
  </div>
))}
      </div>
    </div>
  );
};