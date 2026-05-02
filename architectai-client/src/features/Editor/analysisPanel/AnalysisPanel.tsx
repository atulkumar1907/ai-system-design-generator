import React from 'react';
import './AnalysisPanel.css';

const AnalysisPanel = () => {
  // In a real implementation, this data would come from the 'explanation' object 
  // returned by the /api/v1/generate or /api/v1/diagrams/:id endpoints.
  const analysis = {
    overview: "A horizontally scalable feed architecture using microservices. The system separates read and write paths to handle high fan-out on popular accounts.",
    scalingStrategy: "Write path uses a message queue (Kafka) to buffer fan-out. Read path is served from Redis with pre-computed timelines. CDN handles static media.",
    tradeoffs: [
      { label: "High availability", type: "positive" },
      { label: "Eventual consistency", type: "neutral" },
      { label: "Complex ops", type: "negative" }
    ],
    components: [
      { name: "API Gateway", desc: "routes traffic, handles auth, rate limiting", color: "#60a5fa" },
      { name: "Feed Service", desc: "assembles timeline from following list", color: "#a78bfa" },
      { name: "Redis Cache", desc: "pre-computed user timelines, TTL 5 min", color: "#f87171" },
      { name: "MongoDB", desc: "post storage with indexed queries", color: "#fbbf24" }
    ]
  };

  return (
    <aside className="analysis-panel">
      <div className="analysis-header">
        <label className="section-label">ARCHITECTURE ANALYSIS</label>
      </div>

      <div className="analysis-scroll-content">
        {/* Overview Section */}
        <section className="analysis-section">
          <h3 className="analysis-title">Overview</h3>
          <p className="analysis-text">{analysis.overview}</p>
        </section>

        {/* Scaling Strategy Section */}
        <section className="analysis-section">
          <h3 className="analysis-title">Scaling strategy</h3>
          <p className="analysis-text">{analysis.scalingStrategy}</p>
        </section>

        {/* Tradeoffs Section */}
        <section className="analysis-section">
          <h3 className="analysis-title">Key tradeoffs</h3>
          <div className="tradeoff-tags">
            {analysis.tradeoffs.map((t, idx) => (
              <span key={idx} className={`tradeoff-tag tag-${t.type}`}>
                {t.label}
              </span>
            ))}
          </div>
        </section>

        {/* Components Section */}
        <section className="analysis-section">
          <h3 className="analysis-title">Components</h3>
          <ul className="component-list">
            {analysis.components.map((c, idx) => (
              <li key={idx} className="component-list-item">
                {/* The bullet remains separate for alignment */}
                <span className="comp-bullet" style={{ backgroundColor: c.color }}></span>

                {/* Wrap name and desc in one tag so they wrap together */}
                <p className="comp-text">
                  <span className="comp-name">{c.name} — </span>
                  <span className="comp-desc">{c.desc}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
};

export default AnalysisPanel;