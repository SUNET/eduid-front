// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ErrorsRootState, ErrorsAppDispatch } from "./errors-init-app";

export const useErrorsAppDispatch = () => useDispatch<ErrorsAppDispatch>();
export const useErrorsAppSelector: TypedUseSelectorHook<ErrorsRootState> = useSelector;
