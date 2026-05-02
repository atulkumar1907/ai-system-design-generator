import React from 'react';
import './ComparisonCard.css';
import { Hexagon } from 'lucide-react';

const ComparisonCard = ({type, title, tag, tagType, metrics }) => {
  const metricLabels = [
    { key: 'scalability', label: 'Scalability', color: 'var(--color-brand-purple)' },
    { key: 'devComplexity', label: 'Dev complexity', color: '#fbbf24' },
    { key: 'faultIsolation', label: 'Fault isolation', color: '#4ade80' },
    { key: 'opsCost', label: 'Operational cost', color: '#f87171' },
    { key: 'timeToMarket', label: 'Time to market', color: '#94a3b8' },
    { key: 'testability', label: 'Testability', color: '#38bdf8' },
  ];

  return (
    <div className="comparison-card">
      <div className="card-header">
        <div className="card-identity">
          <div className={`card-icon ${tagType}`}><Hexagon size={18} /></div>
          <div>
            <h3 className="card-title">{title}</h3>
            <p className="card-desc">Independent deployable services</p>
          </div>
        </div>
        <span className={`status-badge ${tagType}`}>{tag}</span>
      </div>

      <div className="metrics-list">
        {metricLabels.map((m) => (
          <div key={m.key} className="metric-row">
            <span className="metric-label">{m.label}</span>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${metrics[m.key] * 10}%`, backgroundColor: m.color }} 
              />
            </div>
            <span className="metric-value">{metrics[m.key]}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonCard;