import Diagram from "../models/diagram.model";

/** Insert one document per architecture in a single round-trip */
export const createDiagrams = (docs: any[]) => {
  return Diagram.insertMany(docs);
};

export const getDiagramById = (id: string) => {
  return Diagram.findById(id);
};

export const updateDiagram = (id: string, data: any) => {
  return Diagram.findByIdAndUpdate(id, data, { new: true });
};

export const deleteDiagram = (id: string) => {
  return Diagram.findByIdAndDelete(id);
};

export const listDiagrams = (query: any) => {
  const { page = 1, limit = 20 } = query;

  return Diagram.find()
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });
};