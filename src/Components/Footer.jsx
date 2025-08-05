import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  ListMusic,
  MonitorSpeaker,
  VolumeX,
} from "lucide-react";

export const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(60);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef(null);

  const toggleMute = () => {
    const isNowMuted = volume !== 0;
    setMuted(isNowMuted);
    setVolume(isNowMuted ? 0 : 60);
    if (audioRef.current) {
      audioRef.current.volume = isNowMuted ? 0 : 0.6;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const handleClick = () => {
    setLiked((prev) => !prev);
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration || 0);
    });

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div className="bg-black fixed bottom-0 w-full py-3 px-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4">
      <audio
        ref={audioRef}
        src="/Images/song.mp3"
        autoPlay
        loop
        volume={volume / 100}
      />

      {/* Left: Album Info */}
      <div className="flex items-center gap-3 min-w-[150px] sm:min-w-[250px]">
        <img
          src="/Images/sifar.png"
          alt="Album"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded"
        />
        <div className="text-white text-sm truncate">
          <div className="font-semibold truncate max-w-[100px] sm:max-w-none">
            Sifar Safar
          </div>
          <div className="text-gray-400 text-xs">Karan Aujla</div>
        </div>

        <img
          src={liked ? "/Images/like.png" : "/Images/unlike.png"}
          alt={liked ? "Liked" : "Not Liked"}
          onClick={() => setLiked(!liked)}
          className="w-6 h-6 cursor-pointer transition duration-200 ease-in-out"
        />
      </div>

      {/* Center: Player Controls */}
      <div className="flex flex-col items-center flex-1 w-full max-w-full">
        <div className="flex items-center justify-center space-x-4 text-white">
          <Shuffle size={20} className="cursor-pointer" />
          <SkipBack size={20} className="cursor-pointer" />
          <button
            className="bg-white text-black p-1 sm:p-2 rounded-full"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <SkipForward size={20} className="cursor-pointer" />
          <Repeat size={20} className="cursor-pointer" />
        </div>

        {/* Progress Bar */}
        <div className="w-full px-2">
          <div className="flex items-center space-x-2 w-full group">
            <span className="text-gray-400 text-xs">
              {formatTime(currentTime)}
            </span>

            {/* Progress Range Input */}
            <div className="relative w-full">
              <input
                type="range"
                min={0}
                max={duration || 1}
                step="0.01"
                value={currentTime}
                onChange={(e) => {
                  const newTime = Number(e.target.value);
                  setCurrentTime(newTime);
                  if (audioRef.current) audioRef.current.currentTime = newTime;
                }}
                className="w-full h-1 appearance-none bg-gray-700 rounded outline-none"
                style={{
                  background: `linear-gradient(to right, #22c55e 0%, #22c55e ${
                    (currentTime / duration) * 100
                  }%, #374151 ${
                    (currentTime / duration) * 100
                  }%, #374151 100%)`,
                }}
              />
              {/* White knob only on hover */}
            </div>

            <span className="text-gray-400 text-xs">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Volume & Icons */}
      <div className="hidden sm:flex items-center gap-3 min-w-[200px] justify-end text-white">
        <ListMusic size={20} className="cursor-pointer" />
        <MonitorSpeaker size={20} className="cursor-pointer" />
        <div className="flex items-center gap-2 w-24 group">
          <div className="flex items-center gap-2 w-24 group">
            <button onClick={toggleMute} className="cursor-pointer" >
              {muted ? (
                <VolumeX className="text-white" size={28}/>
              ) : (
                <Volume2 className="text-white" size={28} />
              )}
            </button>
            <span className="text-sm text-white">{volume}</span>
          </div>
          <div className="relative w-full">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 appearance-none bg-gray-700 rounded outline-none"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${volume}%, #374151 ${volume}%, #374151 100%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
