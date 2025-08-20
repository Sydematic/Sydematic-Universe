const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora Background Animation */}
      <div className="absolute inset-0 bg-gradient-aurora opacity-20 animate-aurora-dance" />
      
      {/* Floating Aurora Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 rounded-full bg-primary/20 animate-float cursor-project" />
      <div className="absolute top-40 right-32 w-16 h-16 rounded-full bg-accent/20 animate-float cursor-project" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 left-32 w-12 h-12 rounded-full bg-aurora-cyan/20 animate-float cursor-project" style={{ animationDelay: '4s' }} />
      <div className="absolute top-60 right-20 w-8 h-8 rounded-full bg-aurora-pink/20 animate-float cursor-project" style={{ animationDelay: '1s' }} />
      
      {/* Twinkling Stars */}
      <div className="absolute top-10 left-1/4 w-2 h-2 rounded-full bg-foreground animate-twinkle" />
      <div className="absolute top-32 right-1/4 w-1 h-1 rounded-full bg-foreground animate-twinkle" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/3 w-1.5 h-1.5 rounded-full bg-foreground animate-twinkle" style={{ animationDelay: '2s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="animate-slide-up">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Sydematic
            <br />
            <span className="bg-gradient-accent bg-clip-text text-transparent">Developer</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Where <span className="text-primary font-semibold">Movies</span>, <span className="text-accent font-semibold">Math</span>, and{" "}
            <span className="text-aurora-cyan font-semibold">Music</span> collide — 
            <br className="hidden md:block" />
            crafting digital experiences that move, compute, and resonate
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-glow-primary hover:scale-105 transition-all duration-500 cursor-project"
            >
              Explore My Universe
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="bg-card/20 backdrop-blur-md border border-primary/30 text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-card/30 hover:border-primary/50 transition-all duration-300 cursor-project"
            >
              Discover My Story
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-glow-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;