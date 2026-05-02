import React from "react";
import { Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./EditorSidePanel.css";

const PALETTE_ITEMS = [
  { label: "Client / Browser", color: "#60a5fa" },
  { label: "Microservice", color: "#a78bfa" },
  { label: "Database", color: "#fbbf24" },
  { label: "Cache (Redis)", color: "#f87171" },
  { label: "Message Queue", color: "#94a3b8" },
  { label: "CDN", color: "#fb923c" },
  { label: "Load Balancer", color: "#2dd4bf" },
  { label: "Auth Service", color: "#f472b6" },
  { label: "Object Storage", color: "#9ca3af" },
];

const EditorSidePanel = () => {
  return (
    <aside className="editor-side-panel">
      {/* PROMPT SECTION */}
      <div className="panel-section">
        <span className="section-label">PROMPT</span>
        <div className="input-wrapper">
          <Textarea
            className="prompt-textarea"
            defaultValue="Design a scalable Instagram-like photo feed"
          />
        </div>
        <Button className="generate-btn">
          <Hexagon size={12} className="mr-2" />
          Generate architecture
        </Button>
      </div>

      {/* COMPONENT PALETTE SECTION */}
        <ScrollArea className="palette-scroll-area">
      <div className="panel-section border-none! section-middle flex-grow">
        <span className="section-label">COMPONENT PALETTE</span>
          <div className="palette-grid">
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
      </div>
        </ScrollArea>

      {/* EXPORT SECTION */}
      <div className="panel-section">
        <span className="section-label">EXPORT</span>
        <div className="export-grid">
          <Button variant="outline" className="export-btn">PDF</Button>
          <Button variant="outline" className="export-btn">PNG</Button>
          <Button variant="outline" className="export-btn">JSON</Button>
        </div>
      </div>
    </aside>
  );
};

export default EditorSidePanel;