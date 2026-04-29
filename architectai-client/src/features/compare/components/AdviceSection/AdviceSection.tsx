import React from 'react';
import './AdviceSection.css';

const AdviceSection = () => {
  const sections = [
    {
      title: "When to use microservices",
      icon: "✓",
      variant: "success",
      items: [
        "Large engineering teams (10+ devs)",
        "Different services need different tech stacks",
        "High traffic with predictable load patterns",
        "Need independent deployment cadences",
        "Domain boundaries are well-defined"
      ]
    },
    {
      title: "When to use serverless",
      icon: "✓",
      variant: "info",
      items: [
        "Event-driven, bursty workloads",
        "Small teams or solo developers",
        "Fast time-to-market is critical",
        "Unpredictable or low-medium traffic",
        "Minimal infrastructure management"
      ]
    },
    {
      title: "Common pitfalls",
      icon: "⚠",
      variant: "warning",
      items: [
        "Microservices: distributed tracing overhead",
        "Serverless: cold start latency spikes",
        "Microservices: data consistency challenges",
        "Serverless: vendor lock-in risk",
        "Both: network partition failures"
      ]
    }
  ];

  return (
    <section className="advice-grid">
      {sections.map((section, idx) => (
        <div key={idx} className={`advice-card border-${section.variant}`}>
          <h4 className={`advice-title text-${section.variant}`}>
            <span className="advice-icon">{section.icon}</span> {section.title}
          </h4>
          <ul className="advice-list">
            {section.items.map((item, itemIdx) => (
              <li key={itemIdx} className="advice-item">{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default AdviceSection;