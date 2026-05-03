import React, { useState } from 'react'
import { Chip } from '../GenerateForm/components/Chip/Chip';
import { DesignCard } from './DesignCard/DesignCard';

import "./Save.css"


export const SavedDesigns = () => {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Microservices", "Monolith", "Serverless", "Event-driven"];

  const designs = [
    {
      title: "Instagram Feed",
      type: "Microservices",
      date: "Mar 12, 2025",
      nodes: ["Client", "API GW", "MongoDB", "Redis", "CDN", "Feed Svc"],
    },
    {
      title: "YouTube Clone",
      type: "Event-driven",
      date: "Mar 10, 2025",
      nodes: ["Client", "API GW", "Kafka", "Transcoder", "S3"],
    },
    {
      title: "Uber Ride Matching",
      type: "Microservices",
      date: "Mar 8, 2025",
      nodes: ["Mobile App", "API GW", "Redis", "Postgres", "Location"],
    },
    {
      title: "Twitter Timeline",
      type: "Microservices",
      date: "Mar 5, 2025",
      nodes: ["Client", "Gateway", "Cassandra", "Redis", "Fan-out"],
    },
    {
      title: "Blog Platform",
      type: "Monolith",
      date: "Mar 2, 2025",
      nodes: ["Browser", "Express App", "Postgres", "Redis"],
    },
  ];

  const filteredDesigns =
    filter === "All"
      ? designs
      : designs.filter((d) => d.type === filter);

  return (
    <div className="saved-container">
      
      {/* HEADER */}
      <div className="header">
        <div>
          <h1>Saved designs</h1>
          <p>6 architectures saved</p>
        </div>

        <button className="new-btn">+ New design</button>
      </div>

      {/* FILTERS */}
      <div className="filters">
        {filters.map((item) => (
          <Chip
            key={item}
            label={item}
            active={filter === item}
            onClick={() => setFilter(item)}
          />
        ))}
      </div>

      {/* GRID */}
      <div className="grid">
        {filteredDesigns.map((design, index) => (
          <DesignCard key={index} {...design} />
        ))}
      </div>
    </div>
  );
};