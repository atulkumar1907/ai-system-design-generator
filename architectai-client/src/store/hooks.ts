import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// pre-typed useSelector
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

// pre-typed useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();