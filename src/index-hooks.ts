// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { IndexAppDispatch, IndexRootState } from "./index-init-app";

export const useIndexAppDispatch = () => useDispatch<IndexAppDispatch>();
export const useIndexAppSelector: TypedUseSelectorHook<IndexRootState> = useSelector;
