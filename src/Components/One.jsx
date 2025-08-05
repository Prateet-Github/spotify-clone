export const One = () => {
  const albums = [
    { image: "/Images/repeat.png", title: "On Repeat", artist: "Spotify" },
    { image: "/Images/rodeo.png", title: "Rodeo", artist: "Travis Scott" },
    { image: "/Images/starboy.png", title: "Starboy", artist: "The Weeknd" },
    { image: "/Images/utopia.png", title: "Utopia", artist: "Travis Scott" },
    { image: "/Images/views.png", title: "Views", artist: "Drake" },
    { image: "/Images/wdty.png", title: "WDTY", artist: "Metro Boomin" },
    {
      image: "/Images/hav.png",
      title: "Heroes and Villains",
      artist: "Metro Boomin",
    },
    { image: "/Images/sifar.png", title: "Sifar Safar", artist: "Karan Aujla" },
  ];

  return (
    <div className="flex flex-col relative z-10 p-4 pt-26 bg-[#121212]">
      <div className="flex gap-2">
        <button className="px-4 py-1 rounded-full text-white bg-amber-950 hover:bg-amber-900 transition">
          All
        </button>
        <button className="px-4 py-1 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition">
          Music
        </button>
        <button className="px-4 py-1 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition">
          Podcasts
        </button>
        <button className="px-4 py-1 rounded-full text-white bg-gray-700 hover:bg-gray-600 transition">
          Playlist Generator
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {albums.map((album, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-4 rounded flex items-center gap-4 hover:bg-gray-700 transition"
          >
            <img
              src={album.image}
              alt={album.title}
              className="w-16 h-16 object-cover rounded hover:scale-105 transition-transform"
            />
            <div>
              <div className="font-semibold text-sm">{album.title}</div>
              <div className="text-gray-400 text-xs">{album.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
