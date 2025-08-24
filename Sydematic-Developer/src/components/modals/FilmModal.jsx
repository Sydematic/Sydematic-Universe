import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Film, ExternalLink } from "lucide-react";

const filmScenes = [
  {
    title: "The Matrix",
    movie: "The Matrix",
    year: 1999,
    scene: "Neo seeing the code for the first time",
    significance: "Reality is just patterns of information",
    codeConnection: "Every bug is a glitch in the matrix - debug to see the truth",
    learnMore:"https://www.youtube.com/watch?v=O5b0ZxUWNf0"
  },
  {
    title: "Inception", 
    movie: "Inception",
    year: 2010,
    scene: "Limbo - the deepest level of dreams",
    significance: "Architecture of nested realities",
    codeConnection: "Recursive functions and nested data structures mirror dream layers",
    learnMore:"https://www.youtube.com/watch?v=a5R3_ToFRGg"
  },
  {
    title: "Interstellar",
    movie: "Interstellar", 
    year: 2014,
    scene: "Cooper in the tesseract",
    significance: "Time as a navigable dimension",
    codeConnection: "Asynchronous programming - manipulating time and sequence",
    learnMore: "https://www.youtube.com/watch?v=TMxJnoPOFkg"
 
  },
  {
    title: "Avatar: The Last Airbender",
    movie: "Avatar: The Last Airbender",
    year: 2005,
    scene: "Aang entering the Avatar State",
    significance: "Connection to all past knowledge and power",
    codeConnection: "Inheritance and accessing the full stack of accumulated wisdom",
    learnMore: "https://www.youtube.com/watch?v=mZhtza3sCmg"
  },
   {
    title: "Avatar",
    movie: "Avatar",
    year: 2009,
    scene: "Jake learning from Neytiri: Network of energy that flows through all living things",
    significance: "Network of energy that flows through all living things",
    codeConnection: "Inheritance and accessing the full stack of accumulated wisdom",
    learnMore: "https://www.youtube.com/watch?v=bFh08ftL9a8"
  }
];

export const FilmModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="bg-gradient-accent border-accent/30 hover:border-accent/60 text-accent-foreground hover:shadow-glow-accent transition-all duration-500"
        >
          <Film className="w-5 h-5 mr-2" />
          Cinematic Moments
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl bg-gradient-card border-accent/20 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-accent bg-clip-text text-transparent">
            🎬 Cinematic Code Inspiration
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-muted-foreground">
            These cinematic moments fundamentally changed how I think about code, architecture, and problem-solving:
          </p>
          
          {filmScenes.map((scene, index) => (
            <div 
              key={index}
              className="p-5 rounded-lg bg-muted/20 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-foreground">{scene.title}</h4>
                  <p className="text-sm text-muted-foreground">{scene.movie} ({scene.year})</p>
                </div>
                <Button variant="ghost" 
                size="sm" 
                className="hover:bg-accent/20"
                 onClick={() => window.open(scene.learnMore, "_blank")}
                >
                <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-accent font-medium">Scene:</span> {scene.scene}
                </p>
                <p className="text-sm">
                  <span className="text-aurora-pink font-medium">Why it matters:</span> {scene.significance}
                </p>
                <p className="text-sm italic text-primary">
                  <span className="text-primary font-medium">Code Connection:</span> {scene.codeConnection}
                </p>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
            <p className="text-sm text-center text-muted-foreground">
              <span className="text-primary font-medium">Philosophy:</span> Every line of code tells a story. 
              Every function has character development. Every app is a journey with stakes, conflict, and resolution.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};