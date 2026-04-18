import * as repo from "../repositories/diagram.repository";

export const createDiagramService = async (data: any) => {
  return repo.createDiagram(data);
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