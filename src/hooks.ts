// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { LoginAppDispatch, LoginRootState } from "login-init-app";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<LoginAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<LoginRootState> = useSelector;
