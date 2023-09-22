// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { IndexAppDispatch as LoginAppDispatch, IndexRootState as LoginRootState } from "index-init-app";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<LoginAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<LoginRootState> = useSelector;
