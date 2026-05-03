import { useState } from "react";
import { Hexagon, ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "./components/SectionTitle/SectionTitle";
import { ToggleCard } from "./components/ToggleCard/ToggleCard";
import "./GenerateForm.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const GenerateForm = () => {
  const [description, setDescription] = useState("");
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [selectedScale, setSelectedScale] = useState("medium");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [dbPreference, setDbPreference] = useState("no-preference");
  const [cloud, setCloud] = useState("agnostic");
  const [notes, setNotes] = useState("");

  const toggleItem = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const handleSubmit = () => {
    if (!description.trim()) return alert("System description is required"); //
    if (selectedPatterns.length === 0) return alert("Select at least one pattern"); //

    const payload = {
      prompt: description,
      architectureTypes: selectedPatterns.map(p => p.toLowerCase()), //
      scale: selectedScale,
      requirements: selectedFeatures,
      dbPreference,
      cloudProvider: cloud,
      constraints: notes,
    };

    console.log("🚀 Payload for /api/v1/generate:", payload); //
  };

  const architectureOptions = [
    { title: "Microservices", desc: "Independent deployable services" },
    { title: "Monolith", desc: "Single deployable unit" },
    { title: "Serverless", desc: "Function-as-a-service" },
    { title: "Event-driven", desc: "Async message passing" },
  ];

  return (
    <div className="generate-container">
      <button className="back-btn" onClick={() => window.history.back()}>
        <ChevronLeft size={16} /> Back to home
      </button>

      <header className="form-header">
        <h1 className="title">Generate architecture</h1>
        <p className="subtitle">
          Fill in the details below. We'll generate selected patterns and
          compare them side by side with interactive diagrams.
        </p>
      </header>

      <div className="form-sections-wrapper">
        <div className="form-group">
          <SectionTitle title="System Description *" />
          <Textarea
            className="notes-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Design a scalable video streaming platform like YouTube..."
          />
        </div>

        <div className="form-group">
          <SectionTitle title="Architecture patterns to generate" />
          <div className="card-grid">
            {architectureOptions.map((item) => (
              <ToggleCard
                key={item.title}
                title={item.title}
                description={item.desc}
                active={selectedPatterns.includes(item.title)}
                onClick={() => toggleItem(item.title, selectedPatterns, setSelectedPatterns)}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <SectionTitle title="ADDITIONAL CONTEXT (OPTIONAL)" />
          <div className="form-row">
            {/* First 50% Column[cite: 1] */}
            <div className="form-field">
              <label className="field-label">PRIMARY DATABASE PREFERENCE</label>
              <Select modal={false}>
                <SelectTrigger className="form-select-trigger">
                  <SelectValue placeholder="No preference" />
                </SelectTrigger>
                <SelectContent position="popper" className="select-dropdown-content">
                  <SelectItem value="no-preference" className="select-item">No preference</SelectItem>
                  <SelectItem value="postgresql" className="select-item">SQL (PostgreSQL, MySQL)</SelectItem>
                  <SelectItem value="mongodb" className="select-item">NoSQL (MongoDB, Cassandra)</SelectItem>
                  <SelectItem value="dynamodb" className="select-item">DynamoDB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Second 50% Column[cite: 1] */}
            <div className="form-field">
              <label className="field-label">CLOUD PROVIDER</label>
              <Select modal={false}>
                <SelectTrigger className="form-select-trigger">
                  <SelectValue placeholder="Cloud agnostic" />
                </SelectTrigger>
                <SelectContent position="popper" className="select-dropdown-content">
                  <SelectItem value="no-preference" className="select-item">No preference</SelectItem>
                  <SelectItem value="postgresql" className="select-item">SQL (PostgreSQL, MySQL)</SelectItem>
                  <SelectItem value="mongodb" className="select-item">NoSQL (MongoDB, Cassandra)</SelectItem>
                  <SelectItem value="dynamodb" className="select-item">DynamoDB</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <SectionTitle title="CONSTRAINTS OR NOTES (OPTIONAL)" />
          <Textarea
            className="notes-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Must support offline mode, HIPAA compliant..."
          />
        </div>
      </div>

      <div className="actions-footer">
        <Button className="btn-primary-glow" onClick={handleSubmit}>
          <Hexagon size={16} className="mr-2" />
          Generate all architectures
        </Button>
        <Button variant="ghost" className="btn-secondary-dark" onClick={() => window.location.reload()}>
          Cancel
        </Button>
      </div>
    </div>
  );
};