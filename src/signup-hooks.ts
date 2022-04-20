// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { SignupRootState, SignupAppDispatch } from "./signup-init-app";

export const useSignupAppDispatch = () => useDispatch<SignupAppDispatch>();
export const useSignupAppSelector: TypedUseSelectorHook<SignupRootState> = useSelector;
