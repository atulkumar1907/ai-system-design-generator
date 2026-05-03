import { resetGenerate, setError, setLoading, setResult } from "../slices/generateSlice";
import { store } from "../store";
import type { GenerateResult } from "../types/generateSlice";

export const GenerateSliceManager = {
  setLoading: (value: boolean) => store.dispatch(setLoading(value)),

  setError: (message: string | null) => store.dispatch(setError(message)),

  setResult: (result: GenerateResult) => store.dispatch(setResult(result)),

  reset: () => store.dispatch(resetGenerate()),
};