import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, X } from "lucide-react";

const ProjectsSection = () => {
  const [openModal, setOpenModal] = useState(null);

  const projects = [
    {
      title: "Elemental Dashboard",
      description:
        "A data visualization platform inspired by Avatar's four elements, featuring interactive charts that flow like water and burn like fire.",
      tech: ["React", "D3.js", "TypeScript", "Tailwind"],
      category: "Web App",
      gradient: "bg-gradient-primary",
    },
    {
      title: "Inception Timer",
      description:
        "A productivity app with nested timers that dive deeper into focus states, just like the movie's layered dream sequences.",
      tech: ["Next.js", "Prisma", "tRPC", "Framer Motion"],
      category: "Productivity",
      gradient: "bg-gradient-accent",
    },
    {
      title: "Cinematic Portfolio",
      description:
        "This very portfolio — a love letter to film and code, featuring custom animations and interactive storytelling.",
      tech: ["React", "Tailwind", "Three.js", "TypeScript"],
      category: "Portfolio",
      gradient: "bg-gradient-card",
    },
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Each project tells a story, blending technical excellence with cinematic inspiration
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="group bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-cinema cursor-project animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-sm bg-muted/30 rounded-full text-muted-foreground">
                    {project.category}
                  </span>
                  <div className={`w-4 h-4 rounded-full ${project.gradient} animate-glow-pulse`} />
                </div>
                <CardTitle
                  className="text-2xl text-foreground group-hover:text-primary transition-colors duration-300 cursor-pointer"
                  onClick={() => setOpenModal(project.title)}
                >
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-accent/10 text-accent border border-accent/20 rounded-full cursor-element"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="aurora" size="sm" className="flex-1">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                  <Button variant="glass" size="sm" className="flex-1">
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

  {/* Modals */}
{projects.map(
  (project) =>
    openModal === project.title && (
      <div
        key={project.title}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-6"
        onClick={() => setOpenModal(null)}
      >
        <div
          className="bg-background rounded-lg max-w-lg w-full p-6 relative z-[10001]"
          onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside modal
        >
          {/* X Button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/20 z-[10002]"
            onClick={() => setOpenModal(null)}
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
          <p className="text-muted-foreground mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs bg-accent/10 text-accent border border-accent/20 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="aurora" size="sm" className="flex-1">
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
            <Button variant="glass" size="sm" className="flex-1">
              <Github className="w-4 h-4" />
              Code
            </Button>
          </div>
        </div>
      </div>
    )
)}


      </div>
    </section>
  );
};

export default ProjectsSection;
