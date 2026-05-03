import { useMemo } from "react";
import { X } from 'lucide-react';
import "./DesignCard.css";

interface Props {
  title: string;
  type: string;
  date: string;
  nodes: string[];
}

export const DesignCard = ({ title, type, date, nodes }: Props) => {
  const positions = useMemo(() => {
    // 1. Create a grid of possible slots (5 columns x 3 rows)
    const slots: { top: number; left: number }[] = [];
    const rows = 3;
    const cols = 5;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        slots.push({
          // Add a small random jitter within the cell for a "natural" look
          top: (r * 30) + 10 + (Math.random() * 10), 
          left: (c * 18) + 5 + (Math.random() * 8),
        });
      }
    }

    // 2. Shuffle the slots
    const shuffled = [...slots].sort(() => Math.random() - 0.5);

    // 3. Assign nodes to shuffled slots
    return nodes.map((_, i) => ({
      top: `${shuffled[i % shuffled.length].top}%`,
      left: `${shuffled[i % shuffled.length].left}%`,
    }));
  }, [nodes]);

  return (
    <div className="design-card">
      <div className="preview">
        {nodes.map((node, i) => (
          <span 
            key={i} 
            className="node"
            style={{ 
              position: 'absolute',
              top: positions[i].top,
              left: positions[i].left 
            }}
          >
            {node}
          </span>
        ))}
      </div>

      <div className="content">
        <h3 className="title-text">{title}</h3>
        <div className="meta">
          <span className={`type ${type.toLowerCase().replace(/\s+/g, '-')}`}>
            {type}
          </span>
          <span className="date">{date}</span>
        </div>
        <div className="actions">
          <button className="action-btn">↗</button>
          <button className="action-btn">↓</button>
          <button className="action-btn">⧉</button>
        </div>
      </div>

      <button className="delete">
        <X size={16} strokeWidth={1} />
      </button>
    </div>
  );
};