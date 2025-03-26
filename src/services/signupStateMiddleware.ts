import { signupSlice } from "slices/Signup";

/*
 * This middleware is used to save signup state in redux store.
 */

export const signupStateMiddleware = (store: any) => (next: any) => (action: any) => {
    if (action.payload?.type !== undefined &&
        action.payload?.type.includes("_SIGNUP_") &&
        action.payload?.payload?.state !== undefined) {
        console.log("setting state", action.payload.payload.state, action.payload.type);
        store.dispatch(signupSlice.actions.setSignupState(action.payload.payload.state));
    }

    return next(action);
};

export default signupStateMiddleware;