// typed variants of useSelector and useDispatch, straight from
//  https://redux.js.org/usage/usage-with-typescript
import { EduIDAppDispatch, EduIDAppRootState } from "eduid-init-app";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<EduIDAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<EduIDAppRootState> = useSelector;
