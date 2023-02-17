// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { ConnectAppDispatch, ConnectRootState } from "./connect-init-app";

export const useConnectAppDispatch = () => useDispatch<ConnectAppDispatch>();
export const useConnectAppSelector: TypedUseSelectorHook<ConnectRootState> = useSelector;
