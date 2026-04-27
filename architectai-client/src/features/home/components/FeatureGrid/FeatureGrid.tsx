import React from 'react';
import './FeatureGrid.css';
import { Hexagon, ArrowLeftRight, Code2, LayoutDashboard } from 'lucide-react';

const features = [
  {
    title: "AI Diagram Generator",
    description: "Describe your system in plain English. Get a React Flow diagram with labeled components and connections instantly.",
    icon: <Hexagon size={20} />,
    colorClass: "icon-purple"
  },
  {
    title: "Architecture Comparison",
    description: "Side-by-side breakdown of Monolith vs Microservices vs Serverless — with real tradeoffs and metrics.",
    icon: <ArrowLeftRight size={20} />,
    colorClass: "icon-green"
  },
  {
    title: "Code Generator",
    description: "Export backend boilerplate in Node.js, Python, or Go — directly from your diagram architecture.",
    icon: <Code2 size={20} />,
    colorClass: "icon-blue"
  },
  {
    title: "Saved Designs",
    description: "All your generated architectures in one place. Export as PDF, share with your team, or fork and iterate.",
    icon: <LayoutDashboard size={20} />,
    colorClass: "icon-orange"
  }
];

const FeatureGrid = () => {
  return (
    <div className="features-container">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className={`icon-container ${feature.colorClass}`}>
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;