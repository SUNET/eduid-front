import { combineReducers } from "redux";
import accountLinkingSlice from "slices/AccountLinking";
import { appLoadingSlice } from "slices/AppLoading";
import chpassSlice from "slices/ChangePassword";
import emailsSlice from "slices/Emails";
import identitiesSlice from "slices/Identities";
import { intlReducer } from "slices/Internationalisation";
import ladokSlice from "slices/Ladok";
import letterProofingSlice from "slices/LetterProofing";
import loginSlice from "slices/Login";
import lookupMobileProofingSlice from "slices/LookupMobileProofing";
import { notificationsSlice } from "slices/Notifications";
import personalDataSlice from "slices/PersonalData";
import phonesSlice from "slices/Phones";
import resetPasswordSlice from "slices/ResetPassword";
import securitySlice from "slices/Security";
import { signupSlice } from "slices/Signup";
import configSlice from "slices/SignupConfig";

const dashboardReducer = combineReducers({
  chpass: chpassSlice.reducer,
  emails: emailsSlice.reducer,
  lookup_mobile: lookupMobileProofingSlice.reducer,
  identities: identitiesSlice.reducer,
  personal_data: personalDataSlice.reducer,
  phones: phonesSlice.reducer,
  letter_proofing: letterProofingSlice.reducer,
  account_linking: accountLinkingSlice.reducer,
  security: securitySlice.reducer,
  ladok: ladokSlice.reducer,
});

const loginReducer = combineReducers({
  login: loginSlice.reducer,
});

const resetPasswordReducer = combineReducers({
  resetPassword: resetPasswordSlice.reducer,
});

const signupReducer = combineReducers({
  signup: signupSlice.reducer,
});

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
  login: loginReducer,
  resetPassword: resetPasswordReducer,
  app: appLoadingSlice.reducer,
  signup: signupReducer,
  dashboard: dashboardReducer,
});

export default eduIDApp;
