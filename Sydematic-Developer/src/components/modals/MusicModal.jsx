import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const songs = [
  {
    title: "Cornfield Chase",
    artist: "Hans Zimmer",
    album: "Interstellar OST",
    inspiration: "Time bending complexity in code architecture",
    file: "/cornfieldchase.mp4",
  },
  {
    title: "Binary Sunset",
    artist: "John Williams",
    album: "Star Wawrs a new hope O.S.T.",
    inspiration: "Mathematical elegance in algorithm design",
    file: "/starwars.mp4",
  },
  {
    title: "Birdsong",
    artist: "Flawed Mangoes",
    album: "Single Cover",
    inspiration: "Communication through universal languages",
    file: "/birdsong.mp4",
  },
  {
    title: "Time",
    artist: "Hans Zimmer",
    album: "Inception",
    inspiration: "Synthetic beauty in digital creation",
    file: "/time.mp4",
  }, 
  {
    title: "The Bioluminescence of the Night",
    artist: "James Horner",
    album: "Avatar",
    inspiration: "Synthetic beauty in digital creation",
    file: "/bioluminescence.mp4",
  },
];

export const MusicModal = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Initialize audio once
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => nextSong();

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  // Play song at a specific index
  const playSongAtIndex = (index) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();       // stop current
    audio.src = "";      // clear source to reset cache
    audio.load();

    audio.src = songs[index].file; // set new file
    audio.load();
    audio.play();

    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // Play/pause for a specific song (modal buttons)
  const handlePlayPauseForSong = (index) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSongIndex === index) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      playSongAtIndex(index);
    }
  };

  // Floating player play/pause
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSongIndex === null) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playSongAtIndex(randomIndex);
    } else {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const nextSong = () => {
    if (currentSongIndex === null) return;
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSongAtIndex(nextIndex);
  };

  const prevSong = () => {
    if (currentSongIndex === null) return;
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSongAtIndex(prevIndex);
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;
  const currentSong = currentSongIndex !== null ? songs[currentSongIndex] : null;
  const isSongPlaying = (index) => currentSongIndex === index && isPlaying;

  return (
    <>
      {/* Floating Player */}
      <div className="fixed bottom-4 right-4 z-50 p-3 bg-muted/70 rounded-xl shadow-lg backdrop-blur-md flex items-center space-x-2">
        <span className="font-semibold text-foreground">
          {currentSong ? currentSong.title : "Play a song"}
        </span>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={prevSong} className="text-green-500 hover:text-green-400">
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handlePlayPause} className="text-green-500 hover:text-green-400">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="sm" onClick={nextSong} className="text-green-500 hover:text-green-400">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="lg" className="bg-gradient-primary border-primary/30 hover:border-primary/60">
            <Music className="w-5 h-5 mr-2" />
            Musical Inspiration
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl bg-gradient-card border-primary/20 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
              🎵 Musical Inspiration
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <p className="text-muted-foreground">
              Music shapes my coding rhythm. Here are the soundtracks that inspire my development process:
            </p>

            {songs.map((song, index) => (
              <div key={song.title} className="p-4 rounded-lg bg-muted/20 border border-primary/10">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{song.title}</h4>
                    <p className="text-sm text-muted-foreground">{song.artist} • {song.album}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handlePlayPauseForSong(index)} className="text-green-500">
                    {isSongPlaying(index) ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm italic text-accent">"{song.inspiration}"</p>

                {isSongPlaying(index) && (
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div
                      className="relative h-2 rounded-lg bg-primary/30 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newTime = (clickX / rect.width) * duration;
                        audioRef.current.currentTime = newTime;
                        setCurrentTime(newTime);
                      }}
                    >
                      <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
