import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music, Play, Pause } from "lucide-react";
import { useState } from "react";

const songs = [
  {
    title: "Interstellar Main Theme",
    artist: "Hans Zimmer",
    album: "Interstellar OST",
    inspiration: "Time bending complexity in code architecture"
  },
  {
    title: "The Theory of Everything",
    artist: "Jóhann Jóhannsson", 
    album: "The Theory of Everything OST",
    inspiration: "Mathematical elegance in algorithm design"
  },
  {
    title: "Arrival",
    artist: "Jóhann Jóhannsson",
    album: "Arrival OST", 
    inspiration: "Communication through universal languages"
  },
  {
    title: "Blade Runner 2049",
    artist: "Hans Zimmer & Benjamin Wallfisch",
    album: "Blade Runner 2049 OST",
    inspiration: "Synthetic beauty in digital creation"
  }
];

export const MusicModal = () => {
  const [currentSong, setCurrentSong] = useState(null);

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
          
          {songs.map((song, index) => (
            <div 
              key={index}
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
                  onClick={() => setCurrentSong(currentSong === song.title ? null : song.title)}
                  className="hover:bg-primary/20"
                >
                  {currentSong === song.title ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-sm text-accent italic">"{song.inspiration}"</p>
            </div>
          ))}
          
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