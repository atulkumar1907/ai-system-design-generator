import * as repo from "../repositories/diagram.repository";

// The full GenerateResponse body posted from the frontend
interface GenerateResponse {
  sessionId: string;
  prompt: string;
  generatedAt: string;
  request: Record<string, any>;
  architectures: Array<{
    type: string;
    systemName: string;
    nodes: any[];
    edges: any[];
    explanation: Record<string, any>;
    metrics?: Record<string, any>;
  }>;
}

/**
 * Flatten the GenerateResponse into one Diagram document per architecture.
 * Returns an array so callers know which docs were created.
 */
export const createDiagramService = async (body: GenerateResponse) => {
  const { prompt, sessionId, architectures } = body;

  const docs = architectures.map((arch) => ({
    prompt,
    sessionId,
    systemName:       arch.systemName,
    architectureType: arch.type,
    nodes:            arch.nodes  ?? [],
    edges:            arch.edges  ?? [],
    explanation:      arch.explanation,
    metrics:          arch.metrics ?? {},
  }));

  // insertMany is atomic per-doc and returns the created documents
  return repo.createDiagrams(docs);
};

export const getDiagramService = async (id: string) => {
  const diagram = await repo.getDiagramById(id);
  if (!diagram) throw new Error("NOT_FOUND");
  return diagram;
};

export const updateDiagramService = async (id: string, data: any) => {
  return repo.updateDiagram(id, data);
};

export const deleteDiagramService = async (id: string) => {
  return repo.deleteDiagram(id);
};

export const listDiagramsService = async (query: any) => {
  return repo.listDiagrams(query);
};