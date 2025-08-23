import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="min-h-screen py-20 px-6 relative">
      {/* Background Aurora Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-primary opacity-10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-accent opacity-10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            The Sydematic Universe
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Where the harmony of <span className="text-primary font-semibold">Movies</span>, 
            the precision of <span className="text-accent font-semibold">Math</span>, 
            and the soul of <span className="text-aurora-cyan font-semibold">Music</span> converge into code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Personal Philosophy */}
          <div className="animate-slide-up">
            <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-glow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary">My Philosophy</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Every great application follows the three-act structure of storytelling: 
                    <span className="text-accent font-semibold"> Setup, Confrontation, Resolution</span>. 
                    The user's journey is the hero's journey.
                  </p>
                  <p>
                    Mathematics provides the underlying <span className="text-quantum font-semibold">quantum mechanics</span> of elegant code — 
                    where algorithms dance with the golden ratio and functions flow like 
                    perfectly orchestrated symphonies.
                  </p>
                  <p>
                    Music teaches us about <span className="text-aurora-cyan font-semibold">rhythm, harmony, and crescendo</span> — 
                    principles I apply to user interfaces, animation timing, and the overall 
                    emotional arc of digital experiences.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skills Constellation */}
          <div className="animate-slide-left">
            <Card className="bg-gradient-card border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-glow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-accent">Technical Constellation</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "React", element: "⚛️", category: "math" },
                    { name: "JavaScript", element: "🟨", category: "math" },
                    { name: "Node.js", element: "🌟", category: "music" },
                    { name: "Python", element: "🐍", category: "math" },
                    { name: "Animation", element: "🎬", category: "film" },
                    { name: "Three.js", element: "🌌", category: "film" },
                    { name: "Algorithms", element: "🧮", category: "math" },
                    { name: "UX Design", element: "🎨", category: "music" }
                  ].map((skill, index) => (
                    <div 
                      key={skill.name}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 cursor-project ${
                        skill.category === 'math' ? 'bg-quantum/10 hover:bg-quantum/20' :
                        skill.category === 'film' ? 'bg-accent/10 hover:bg-accent/20' :
                        'bg-primary/10 hover:bg-primary/20'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="text-xl">{skill.element}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Big 3 M's Philosophy */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-card border-accent/20 hover:border-accent/40 transition-all duration-500 animate-scale-in cursor-film">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h4 className="text-xl font-bold mb-3 text-accent">Movies</h4>
              <p className="text-sm text-muted-foreground">
                Storytelling structure, visual composition, and emotional pacing guide every user experience I craft.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-quantum/20 hover:border-quantum/40 transition-all duration-500 animate-scale-in cursor-quantum" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">⚛️</div>
              <h4 className="text-xl font-bold mb-3 text-quantum">Math</h4>
              <p className="text-sm text-muted-foreground">
                From quantum superposition to the golden ratio, mathematical beauty creates elegant, efficient solutions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 animate-scale-in cursor-music" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h4 className="text-xl font-bold mb-3 text-primary">Music</h4>
              <p className="text-sm text-muted-foreground">
                Rhythm, harmony, and crescendo shape my approach to animations, interactions, and code architecture.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center animate-fade-in">
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground/90 italic max-w-5xl mx-auto mb-6">
            "In the quantum realm of possibility, every function is a symphony, every algorithm is a story, 
            and every user interaction is a moment of cosmic connection."
          </blockquote>
          <cite className="block text-lg text-muted-foreground">
            — The Sydematic Manifesto
          </cite>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;