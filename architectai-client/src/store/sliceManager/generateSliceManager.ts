import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
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

export default function useGenerateSliceManager() {
  const generateState = useSelector((state: RootState) => state.generate);
  const dispatch = useDispatch();

  return {
    ...generateState,
    setLoading: (value: boolean) => dispatch(setLoading(value)),

    setError: (message: string | null) => dispatch(setError(message)),

    setResult: (result: GenerateResponse) => dispatch(setResult(result)),

    setActiveArchitectureType: (type: string) =>
      dispatch(setActiveArchitectureType(type)),

    setLastRequest: (payload: GeneratePayload) =>
      dispatch(setLastRequest(payload)),

    reset: () => dispatch(resetGenerate()),
  };
}

