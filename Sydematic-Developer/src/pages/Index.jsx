import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import CustomCursor from "@/components/CustomCursor";
import { MusicModal } from "@/components/modals/MusicModal";
import { FilmModal } from "@/components/modals/FilmModal";
import { QuantumModal } from "@/components/modals/QuantumModal";
import { ContactModal } from "@/components/modals/ContactModal"; // New Contact Modal

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <CustomCursor />

      {/* Aurora Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sydematic
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#hero" className="text-muted-foreground hover:text-primary transition-colors cursor-project">
                Universe
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors cursor-project">
                About
              </a>
              <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors cursor-project">
                Projects
              </a>
              <a href="#big3" className="text-muted-foreground hover:text-primary transition-colors cursor-project">
                The Big 3
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <div id="hero">
          <HeroSection />
        </div>
        <AboutSection />
        <ProjectsSection />
      </main>

      {/* Interactive Footer - The Big 3 M's */}
      <footer id="big3" className="py-16 px-6 border-t border-primary/20 bg-gradient-card relative">
        {/* Background Aurora */}
        <div className="absolute inset-0 bg-gradient-aurora opacity-5 animate-aurora-dance" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Explore the Big 3 M's
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deeper into the Movies, Math, and Music that inspire every line of code I write
            </p>
          </div>

          {/* Modals Row */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <div className="cursor-music">
              <MusicModal />
            </div>
            <div className="cursor-film">
              <FilmModal />
            </div>
            <div className="cursor-quantum">
              <QuantumModal />
            </div>
            <div className="cursor-contact">
              <ContactModal />
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-6 text-sm">
              <a href="https://linktr.ee/sydematic" className="text-muted-foreground hover:text-primary transition-colors cursor-project">
                Linktree
              </a>
              <a href="https://github.com/sydematic" className="text-muted-foreground hover:text-primary transition-colors cursor-project">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/sydni-poteat-aa05b521b/" className="text-muted-foreground hover:text-primary transition-colors cursor-project">
                LinkedIn
              </a>
            </div>

            <p className="text-muted-foreground text-sm">
              Built with passion for the cosmic dance of{" "}
              <span className="text-accent">Movies</span>,{" "}
              <span className="text-quantum">Math</span>, and{" "}
              <span className="text-primary">Music</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};



export default Index;