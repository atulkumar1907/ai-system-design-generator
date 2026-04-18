export const exportJSON = async (diagramId: string) => {
  try {
    return { url: `http://download/${diagramId}.json` };
  } catch (error) {
    throw error;
  }
};