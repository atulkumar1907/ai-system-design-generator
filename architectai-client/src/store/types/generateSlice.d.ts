// ─── Node & Edge ─────────────────────────────────────────────────────────────

export interface ArchitectureNode {
  id: string;
  type: "frontend" | "backend" | "database" | "cache" | "network" | "compute" | "storage" | "cdn" | string;
  label: string;
  x: number;
  y: number;
  color: string;
}

export interface ArchitectureEdge {
  id: string;
  from: string;
  to: string;
  label: string;
}

// ─── Explanation & Metrics ───────────────────────────────────────────────────

export interface ArchitectureExplanation {
  overview: string;
  components: string[];
  pros: string[];
  cons: string[];
}

export interface ArchitectureMetrics {
  scalability: string;
  cost: string;
  complexity: string;
}

// ─── Architecture ─────────────────────────────────────────────────────────────

export interface Architecture {
  type: string;
  systemName: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  explanation: ArchitectureExplanation;
  metrics: ArchitectureMetrics;
}

// ─── Request & Response ──────────────────────────────────────────────────────

export interface GeneratePayload {
  prompt: string;
  architectureTypes: string[];
  scale: string;
  specialRequirements: string[];
  dbPreference: string;
  cloudProvider: string;
  constraints: string;
}

export interface GenerateResponse {
  sessionId: string;
  prompt: string;
  generatedAt: string;
  request: GeneratePayload;
  architectures: Architecture[];
}

// ─── Redux State ─────────────────────────────────────────────────────────────

export interface GenerateState {
  isLoading: boolean;
  error: string | null;

  // Full API response — needed for results page rendering
  result: GenerateResponse | null;

  // Persisted separately for easy access across pages (e.g. breadcrumb, summary header)
  sessionId: string | null;
  prompt: string | null;
  generatedAt: string | null;

  // Last submitted request — useful to prefill form again or show request summary
  lastRequest: GeneratePayload | null;

  // Which architecture tab is active on the results page
  activeArchitectureType: string | null;
}