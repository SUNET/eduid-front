// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { DashboardRootState, DashboardAppDispatch } from "./dashboard-init-app";

export const useDashboardAppDispatch = () => useDispatch<DashboardAppDispatch>();
export const useDashboardAppSelector: TypedUseSelectorHook<DashboardRootState> = useSelector;
