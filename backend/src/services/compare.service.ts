export const compareArchitectures = async (data: any) => {
  try {
    return {
      sessionId: "mock-session",
      prompt: data.prompt,
      generatedAt: new Date().toISOString(),
      architectures: [],
      comparison: {},
      recommendation: "microservices - best scalability",
    };
  } catch (error) {
    throw error;
  }
};