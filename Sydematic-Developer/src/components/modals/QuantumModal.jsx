import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Atom, ExternalLink, BookOpen } from "lucide-react";

const quantumConcepts = [
  {
    title: "Quantum Superposition",
    concept: "A particle can exist in multiple states simultaneously until observed",
    explanation: "Schrödinger's cat is both alive and dead until we open the box",
    codeParallel: "Variables can hold multiple potential values in async operations until resolved",
    formula: "ψ = α|0⟩ + β|1⟩",
    learnMore: "https://www.britannica.com/science/quantum-mechanics-physics"
  },
  {
    title: "Quantum Entanglement",
    concept: "Two particles become connected and instantly affect each other regardless of distance",
    explanation: "Einstein called it 'spooky action at a distance'",
    codeParallel: "Event-driven architecture - changes in one component instantly trigger updates elsewhere",
    formula: "1/√2(|00⟩ + |11⟩)",
    learnMore: "https://www.britannica.com/science/quantum-entanglement"
  },
  {
    title: "Quantum Tunneling",
    concept: "Particles can pass through barriers that should be impossible to cross",
    explanation: "A ball rolling up a hill and appearing on the other side without having enough energy",
    codeParallel: "Callbacks and closures accessing variables outside their scope",
    learnMore: "https://www.britannica.com/science/tunneling"
  },
  {
    title: "Observer Effect",
    concept: "The act of observation changes the outcome",
    explanation: "Measuring a particle's position changes its momentum",
    codeParallel: "Debugging changes program behavior - console.log statements affect timing",
    formula: "ΔxΔp ≥ ℏ/2",  
    learnMore: "https://thedailyscience.org/what-role-does-the-observer-effect-play-in-quantum-experiments.html?utm_source=chatgpt.com"
  },
  {
    title: "Mathematical Beauty: Golden Ratio",
    concept: "φ = (1 + √5) / 2 ≈ 1.618",
    explanation: "Found in nature, art, and architecture - the most aesthetically pleasing proportion",
    codeParallel: "Perfect for UI spacing, layout ratios, and animation timing",
    formula: "φ = (1 + √5) / 2",
    learnMore: "https://www.britannica.com/science/golden-ratio"
  }
];

export const QuantumModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="bg-gradient-quantum border-quantum/30 hover:border-quantum/60 text-quantum-foreground hover:shadow-glow-quantum transition-all duration-500"
        >
          <Atom className="w-5 h-5 mr-2" />
          Quantum & Math
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl bg-gradient-card border-quantum/20 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-quantum bg-clip-text text-transparent">
            ⚛️ Quantum Theory & Mathematical Beauty
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-muted-foreground">
            The universe operates on mathematical principles that mirror programming concepts. 
            Here's how quantum physics and mathematics inspire my approach to code:
          </p>
          
          {quantumConcepts.map((concept, index) => (
            <div 
              key={index}
              className="p-5 rounded-lg bg-muted/20 border border-quantum/10 hover:border-quantum/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground mb-1">{concept.title}</h4>
                  {concept.formula && (
                    <div className="font-mono text-quantum bg-quantum/10 px-3 py-1 rounded inline-block mb-2">
                      {concept.formula}
                    </div>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-quantum/20"
                  onClick={() => window.open(concept.learnMore, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-quantum font-medium">Concept:</span> {concept.concept}
                </p>
                <p className="text-sm">
                  <span className="text-aurora-pink font-medium">In Simple Terms:</span> {concept.explanation}
                </p>
                <p className="text-sm italic text-primary">
                  <span className="text-primary font-medium">Code Connection:</span> {concept.codeParallel}
                </p>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 rounded-lg bg-gradient-aurora/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-quantum" />
              <span className="text-quantum font-medium">Deep Dive Resources</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Want to explore more? Check out "Quantum Computing: An Applied Approach" and 
              "The Elegant Universe" for mind-bending connections between physics and computation.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};