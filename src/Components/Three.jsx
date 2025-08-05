export const Three = () => {
  const items = [
    { image: "/Images/lover.png", title: "Chill Vibes" },
    { image: "/Images/purpose.png", title: "Workout Beats" },
    { image: "/Images/lana.png", title: "Focus Mode" },
    { image: "/Images/dawnfm.png", title: "Top 50 Global" },
    { image: "/Images/hut.png", title: "Lo-Fi Love" },
    { image: "/Images/astro.png", title: "Mood Booster" },
    { image: "/Images/sifar.png", title: "Punjabi Bangers" },
    { image: "/Images/afterhours.png", title: "After Hours" },
    { image: "/Images/ldr.png", title: "Rainy Day" },
    { image: "/Images/utopia.png", title: "Hot Hits India" },
  ];

  return (
    <div className="bg-[#121212] pb-24">
      <div className="text-white p-6">
        <p className="font-extralight">
          Brand new music from artists you love.
        </p>
        <h1 className="text-5xl mt-2 font-bold">New releases for you</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-[#181818] hover:bg-[#282828] text-white p-4 rounded-lg transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover rounded mb-3"
            />
            <div className="font-semibold text-sm py-4">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
