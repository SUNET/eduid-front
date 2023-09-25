// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { EduIDAppDispatch, EduIDAppRootState } from "./eduid-init-app";

export const useEduIDAppDispatch = () => useDispatch<EduIDAppDispatch>();
export const useEduIDAppSelector: TypedUseSelectorHook<EduIDAppRootState> = useSelector;
