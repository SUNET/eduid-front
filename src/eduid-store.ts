import { eduIDApi } from "apis/api";
import { combineReducers } from "redux";
import accountLinkingSlice from "slices/AccountLinking";
import { appLoadingSlice } from "slices/AppLoading";
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

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
  login: loginSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  app: appLoadingSlice.reducer,
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
});

export default eduIDApp;
