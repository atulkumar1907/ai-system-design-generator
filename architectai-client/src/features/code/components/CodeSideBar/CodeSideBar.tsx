import React from 'react';
import { Hexagon, Download } from 'lucide-react';
import './CodeSidebar.css';

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const CodeSidebar = ({ isOpen, toggleSidebar }: Props) => {
  return (
    <aside className={`code-sidebar ${isOpen ? 'open' : ''}`}>
      {/* SCROLLABLE CONTENT AREA */}
      <div className="sidebar-scroll-content">
        <section className="config-group">
          <label className="sidebar-label">LANGUAGE</label>
          <div className="option-list">
            <button className="option active"><span className="dot nodejs" /> Node.js (TypeScript)</button>
            <button className="option"><span className="dot python" /> Python (FastAPI)</button>
            <button className="option"><span className="dot go" /> Go (Gin)</button>
          </div>
        </section>

        <section className="config-group">
          <label className="sidebar-label">ARCHITECTURE TYPE</label>
          <div className="option-list">
            <button className="option active">Layered (Controller → Service → Repo)</button>
            <button className="option">Hexagonal / Ports & Adapters</button>
            <button className="option">CQRS</button>
          </div>
        </section>

        <section className="config-group">
          <label className="sidebar-label">INCLUDE</label>
          <div className="option-list">
            <button className="option active"><span className="dot include" /> Authentication boilerplate</button>
            <button className="option active"><span className="dot include" /> Database models</button>
            <button className="option active"><span className="dot include" /> API routes</button>
            <button className="option active"><span className="dot include" /> Docker + docker-compose</button>
            <button className="option"><span className="dot" /> Unit test scaffolding</button>
            <button className="option"><span className="dot" /> Redis configuration</button>
          </div>
        </section>
      </div>

      {/* PINNED ACTIONS AT BOTTOM */}
      <div className="sidebar-actions">
        <button className="regen-btn">
          <Hexagon size={16} /> 
          Regenerate
        </button>
        <button className="download-btn">
          <Download size={16} /> 
          Download .zip
        </button>
      </div>
    </aside>
  );
};

export default CodeSidebar;