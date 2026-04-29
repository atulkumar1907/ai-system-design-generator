import React from 'react';
import './Compare.css';
import ComparisonCard from './components/ComparisonCard/ComparisonCard';
import AdviceSection from './components/AdviceSection/AdviceSection';

const Compare = () => {
  return (
    <div className="compare-page">
      <header className="compare-header">
        <h1 className="compare-title">Compare architectures</h1>
        <p className="compare-subtitle">Evaluate patterns for your specific use case with real metrics and tradeoffs.</p>
        
        <div className="compare-controls">
          <div className="selector-group">
            <select className="arch-select"><option>Microservices</option></select>
            <span className="vs-badge">vs</span>
            <select className="arch-select"><option>Serverless</option></select>
          </div>
          <button className="add-saved-btn">Add to saved</button>
        </div>
      </header>

      <main className="compare-content">
        <div className="comparison-cards-grid">
          <ComparisonCard 
            type="microservices" 
            title="Microservices" 
            tag="Recommended" 
            tagType="recommended"
            metrics={{ scalability: 9, devComplexity: 8, faultIsolation: 9, opsCost: 7, timeToMarket: 5, testability: 7 }}
          />
          <ComparisonCard 
            type="serverless" 
            title="Serverless" 
            tag="Low ops" 
            tagType="low-ops"
            metrics={{ scalability: 9.5, devComplexity: 4, faultIsolation: 8.5, opsCost: 3, timeToMarket: 9, testability: 5.5 }}
          />
        </div>

        <AdviceSection />
      </main>
    </div>
  );
};

export default Compare;