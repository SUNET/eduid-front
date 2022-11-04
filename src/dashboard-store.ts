import accountLinkingSlice from "reducers/AccountLinking";
import chpassSlice from "reducers/ChangePassword";
import configSlice from "reducers/DashboardConfig";
import emailsSlice from "reducers/Emails";
import identitiesSlice from "reducers/Identities";
import ladokSlice from "reducers/Ladok";
import letterProofingSlice from "reducers/LetterProofing";
import lookupMobileProofingSlice from "reducers/LookupMobileProofing";
import { notificationsSlice } from "reducers/Notifications";
import personalDataSlice from "reducers/PersonalData";
import phonesSlice from "reducers/Phones";
import securitySlice from "reducers/Security";
import { combineReducers } from "redux";
import { intlReducer } from "./reducers/Internationalisation";

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
