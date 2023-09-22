import { combineReducers } from "redux";
<<<<<<< HEAD
import configSlice from "./login/redux/reducers/errorsMainReducer";
import { intlReducer } from "./reducers/Internationalisation";
import { notificationsSlice } from "./reducers/Notifications";
=======
import accountLinkingSlice from "slices/AccountLinking";
import { appLoadingSlice } from "slices/AppLoading";
import chpassSlice from "slices/ChangePassword";
import emailsSlice from "slices/Emails";
import identitiesSlice from "slices/Identities";
import configSlice from "slices/IndexConfig";
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
<<<<<<< HEAD
import configSlice from "slices/SignupConfig";
>>>>>>> 0184ea09c (update rootstate)
=======
>>>>>>> 3cb06bdce (DashboardMain -> IndexMain)

const eduIDApp = combineReducers({
  config: configSlice.reducer,
  intl: intlReducer,
  notifications: notificationsSlice.reducer,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  signup: signupSlice.reducer,
  login: loginSlice.reducer,
  app: appLoadingSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
=======
  login: loginSlice.reducer,
  resetPassword: resetPasswordSlice.reducer,
  app: appLoadingSlice.reducer,
  signup: signupSlice.reducer,
>>>>>>> 3cb06bdce (DashboardMain -> IndexMain)
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
<<<<<<< HEAD
>>>>>>> 0184ea09c (update rootstate)
=======
>>>>>>> 3cb06bdce (DashboardMain -> IndexMain)
});

export default eduIDApp;
