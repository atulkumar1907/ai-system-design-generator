import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import "./hero.css";

export const Hero = () => {
  return (
    <section className="hero">
      
      {/* GRID */} 
      <div className="hero-grid" />

      {/* ORB */}
      <div className="hero-orb" />

      {/* CONTENT */}
      <div className="hero-content">
        
        <Badge className="hero-badge">
          <span className="hero-badge-dot" />
          AI-powered · No signup required
        </Badge>

        <h1 className="hero-title font-syne">
          Design scalable systems <br />
          <span>in seconds, not hours</span>
        </h1>

        <p className="hero-sub">
          Describe your system, get architecture diagrams, tradeoff analysis, 
          and backend starter code — all in one intelligent workspace.
        </p>

        <div className="hero-cta">
          <Button className="btn-primary">
            ⬡ Generate architecture
          </Button>
          <Button variant="outline" className="btn-secondary">
            Compare patterns
          </Button>
        </div>

        {/* PROMPT BOX */}
        <div className="prompt-box">
          <div className="prompt-icon">⬡</div>
          <div>
            <div className="prompt-label">Live Prompt</div>
            <div className="prompt-text text-gray-400">
              Design a scalable Instagram-like feed service
              <span className="prompt-cursor" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};