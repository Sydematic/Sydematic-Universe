import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music, Play, Pause } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const songs = [
  {
    title: "Cornfield Chase",
    artist: "Hans Zimmer",
    album: "Interstellar OST",
    inspiration: "Time bending complexity in code architecture",
    file: "/ATLA.mp4",
  },
  {
    title: "The Theory of Everything",
    artist: "Jóhann Jóhannsson",
    album: "The Theory of Everything OST",
    inspiration: "Mathematical elegance in algorithm design",
    file: "/music/theory.mp4",
  },
  {
    title: "Birdsong",
    artist: "Flawed Mangoes",
    album: "Single Cover",
    inspiration: "Communication through universal languages",
    file: "/music/arrival.mp4",
  },
  {
    title: "Blade Runner 2049",
    artist: "Hans Zimmer & Benjamin Wallfisch",
    album: "Blade Runner 2049 OST",
    inspiration: "Synthetic beauty in digital creation",
    file: "/music/bladerunner.mp4",
  },
];

export const MusicModal = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Create the Audio object on mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnd = () => setCurrentSong(null);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnd);
    };
  }, []);

  const handlePlayPause = (song) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSong === song.title) {
      audio.pause();
      setCurrentSong(null);
    } else {
      audio.src = song.file;
      audio.play();
      setCurrentSong(song.title);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="bg-gradient-primary border-primary/30 hover:border-primary/60 text-primary-foreground hover:shadow-glow-primary transition-all duration-500"
        >
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

          {songs.map((song) => {
            const progress = duration ? (currentTime / duration) * 100 : 0;

            return (
              <div
                key={song.title}
                className="p-4 rounded-lg bg-muted/20 border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{song.title}</h4>
                    <p className="text-sm text-muted-foreground">{song.artist} • {song.album}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayPause(song)}
                    className="hover:bg-primary/20"
                  >
                    {currentSong === song.title ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm text-accent italic">"{song.inspiration}"</p>

                {currentSong === song.title && (
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                    <div
                      className="relative h-2 rounded-lg bg-primary/30 overflow-hidden cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newTime = (clickX / rect.width) * duration;
                        audioRef.current.currentTime = newTime;
                        setCurrentTime(newTime);
                      }}
                    >
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-6 p-4 rounded-lg bg-gradient-accent/10 border border-accent/20">
            <p className="text-sm text-center text-muted-foreground">
              <span className="text-accent font-medium">Pro tip:</span> I code best to instrumental soundtracks —
              they create the perfect atmosphere for deep focus and creative problem-solving.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
