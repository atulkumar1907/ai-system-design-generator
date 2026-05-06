import { useAppSelector } from "../hooks";
import { store } from "../store";
import {
  setLoading,
  setError,
  setResult,
  setActiveArchitectureType,
  setLastRequest,
  resetGenerate,
} from "../slices/generateSlice";
import type { GenerateResponse, GeneratePayload } from "../types/generateSlice";

// ─── Dispatchers (plain object, no hook needed) ───────────────────────────────

export const GenerateSliceManager = {
  


  setLoading: (value: boolean) =>
    store.dispatch(setLoading(value)),

  setError: (message: string | null) =>
    store.dispatch(setError(message)),

  setResult: (result: GenerateResponse) =>
    store.dispatch(setResult(result)),

  setActiveArchitectureType: (type: string) =>
    store.dispatch(setActiveArchitectureType(type)),

  setLastRequest: (payload: GeneratePayload) =>
    store.dispatch(setLastRequest(payload)),

  reset: () =>
    store.dispatch(resetGenerate()),
};

// ─── Hook (state + dispatchers together) ─────────────────────────────────────

export const useGenerateSlice = () => {
  const isLoading              = useAppSelector((s) => s.generate.isLoading);
  const error                  = useAppSelector((s) => s.generate.error);
  const result                 = useAppSelector((s) => s.generate.result);
  const sessionId              = useAppSelector((s) => s.generate.sessionId);
  const prompt                 = useAppSelector((s) => s.generate.prompt);
  const generatedAt            = useAppSelector((s) => s.generate.generatedAt);
  const lastRequest            = useAppSelector((s) => s.generate.lastRequest);
  const activeArchitectureType = useAppSelector((s) => s.generate.activeArchitectureType);
  const architectures          = useAppSelector((s) => s.generate.result?.architectures ?? []);

  return {
    // ── State ──
    isLoading,
    error,
    result,
    sessionId,
    prompt,
    generatedAt,
    lastRequest,
    activeArchitectureType,
    architectures,

    // ── Dispatchers ──
    setLoading:                GenerateSliceManager.setLoading,
    setError:                  GenerateSliceManager.setError,
    setResult:                 GenerateSliceManager.setResult,
    setActiveArchitectureType: GenerateSliceManager.setActiveArchitectureType,
    setLastRequest:            GenerateSliceManager.setLastRequest,
    reset:                     GenerateSliceManager.reset,
  };
};