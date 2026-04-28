import React from 'react';
import { Hexagon, FileText, Image, Download, Terminal } from 'lucide-react';
import './EditorSidePanel.css';

const PALETTE_ITEMS = [
  { label: 'Client / Browser', color: '#60a5fa', type: 'client' },
  { label: 'API Gateway', color: '#4ade80', type: 'gateway' },
  { label: 'Microservice', color: '#a78bfa', type: 'service' },
  { label: 'Database', color: '#fbbf24', type: 'database' },
  { label: 'Cache (Redis)', color: '#f87171', type: 'cache' },
  { label: 'Message Queue', color: '#94a3b8', type: 'queue' },
  { label: 'CDN', color: '#fb923c', type: 'cdn' },
  { label: 'Load Balancer', color: '#2dd4bf', type: 'gateway' },
  { label: 'Auth Service', color: '#f472b6', type: 'service' },
  { label: 'Object Storage', color: '#9ca3af', type: 'storage' },
];

const EditorSidePanel = () => {
  return (
    <aside className="editor-side-panel">
      {/* PROMPT SECTION  */}
      <section className="panel-section">
        <label className="section-label">PROMPT</label>
        <textarea 
          className="prompt-textarea"
          placeholder="Design a scalable Instagram-like photo feed"
          defaultValue="Design a scalable Instagram-like photo feed"
        />
        <button className="generate-btn">
          <Hexagon size={16} className="btn-icon" />
          Generate architecture
        </button>
      </section>

      {/* COMPONENT PALETTE - Scrollable Area  */}
      <section className="panel-section grow">
        <label className="section-label">COMPONENT PALETTE</label>
        <div className="palette-scroll-area">
          {PALETTE_ITEMS.map((item, idx) => (
            <div key={idx} className="palette-item" draggable>
              <span 
                className="item-dot" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="item-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* EXPORT SECTION [cite: 58, 63] */}
      <section className="panel-section export-section">
        <label className="section-label">EXPORT</label>
        <div className="export-grid">
          <button className="export-btn">PDF</button>
          <button className="export-btn">PNG</button>
          <button className="export-btn">JSON</button>
        </div>
      </section>
    </aside>
  );
};

export default EditorSidePanel;