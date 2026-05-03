export interface GenerateState {
  isLoading: boolean;
  error: string | null;
  result: GenerateResult | null;
}

export interface GenerateResult {
  architectures: Architecture[];
  comparisonId: string;
}

export interface Architecture {
  type: string;
  diagram: string;
  components: string[];
}

export interface GeneratePayload {
  prompt: string;
  architectureTypes: string[];
  scale: string;
  specialRequirements: string[];
  dbPreference: string;
  cloudProvider: string;
  constraints: string;
}