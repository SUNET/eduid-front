import { combineReducers } from "redux";
import accountLinkingSlice from "slices/AccountLinking";
import chpassSlice from "slices/ChangePassword";
import configSlice from "slices/DashboardConfig";
import emailsSlice from "slices/Emails";
import identitiesSlice from "slices/Identities";
import ladokSlice from "slices/Ladok";
import letterProofingSlice from "slices/LetterProofing";
import lookupMobileProofingSlice from "slices/LookupMobileProofing";
import { notificationsSlice } from "slices/Notifications";
import personalDataSlice from "slices/PersonalData";
import phonesSlice from "slices/Phones";
import securitySlice from "slices/Security";
import { intlReducer } from "./slices/Internationalisation";

const eduIDApp = combineReducers({
  chpass: chpassSlice.reducer,
  config: configSlice.reducer,
  emails: emailsSlice.reducer,
  lookup_mobile: lookupMobileProofingSlice.reducer,
  identities: identitiesSlice.reducer,
  personal_data: personalDataSlice.reducer,
  phones: phonesSlice.reducer,
  letter_proofing: letterProofingSlice.reducer,
  notifications: notificationsSlice.reducer,
  account_linking: accountLinkingSlice.reducer,
  security: securitySlice.reducer,
  ladok: ladokSlice.reducer,
  intl: intlReducer,
});

export default eduIDApp;
