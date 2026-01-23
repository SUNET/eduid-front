import { eduIDApi } from "apis/common";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { combineReducers, UnknownAction } from "redux";
import accountLinkingSlice from "slices/AccountLinking";
import authnSlice from "slices/Authn";
import chpassSlice from "slices/ChangePassword";
import emailsSlice from "slices/Emails";
import configSlice from "slices/IndexConfig";
import { intlReducer } from "slices/Internationalisation";
import ladokSlice from "slices/Ladok";
import letterProofingSlice from "slices/LetterProofing";
import loginSlice from "slices/Login";
import { notificationsSlice } from "slices/Notifications";
import personalDataSlice from "slices/PersonalData";
import resetPasswordSlice from "slices/ResetPassword";
import securitySlice from "slices/Security";
import { signupSlice } from "slices/Signup";

const eduIDReducers = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
  login: loginSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  signup: signupSlice.reducer,
  chpass: chpassSlice.reducer,
  emails: emailsSlice.reducer,
  personal_data: personalDataSlice.reducer,
  letter_proofing: letterProofingSlice.reducer,
  account_linking: accountLinkingSlice.reducer,
  security: securitySlice.reducer,
  ladok: ladokSlice.reducer,
  authn: authnSlice.reducer,
  [eduIDApi.reducerPath]: eduIDApi.reducer,
  [navigatorCredentialsApi.reducerPath]: navigatorCredentialsApi.reducer,
});

const eduIDApp = (
  state: ReturnType<typeof eduIDReducers> | Partial<ReturnType<typeof eduIDReducers>> | undefined,
  action: UnknownAction
): ReturnType<typeof eduIDReducers> => {
  // This action type is dispatched to reset the store on logout
  if (action.type === "RESET_STORE") {
    // setting an empty object will cause all reducers to re-initialize their state
    state = {};
  }
  return eduIDReducers(state, action);
};

export default eduIDApp;
