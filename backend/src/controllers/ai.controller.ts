export const generateArchitecture = async (payload: any) => {
  try {
    // TODO: Replace with OpenAI later
    return payload.architectureTypes.map((type: string) => ({
      type,
      systemName: `${type}-system`,
      nodes: [],
      edges: [],
      explanation: {},
      metrics: {},
    }));
  } catch (error) {
    throw error;
  }
};