// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { LoginRootState, LoginAppDispatch } from "./initStore";

export const useAppDispatch = () => useDispatch<LoginAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<LoginRootState> = useSelector;
