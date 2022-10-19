import accountLinkingSlice from "reducers/AccountLinking";
import chpassSlice from "reducers/ChangePassword";
import configSlice from "reducers/DashboardConfig";
import emailsSlice from "reducers/Emails";
import identitiesSlice from "reducers/Identities";
import ladokSlice from "reducers/Ladok";
import letterProofingSlice from "reducers/LetterProofing";
import lookupMobileProofingSlice from "reducers/LookupMobileProofing";
import { notificationsSlice } from "reducers/Notifications";
import openidConnectReducer from "reducers/OpenidConnect";
import openidConnectFrejaReducer from "reducers/OpenidConnectFreja";
import personalDataSlice from "reducers/PersonalData";
import phonesSlice from "reducers/Phones";
import securityReducer from "reducers/Security";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { intlReducer } from "./reducers/Internationalisation";

const eduIDApp = combineReducers({
  chpass: chpassSlice.reducer,
  config: configSlice.reducer,
  emails: emailsSlice.reducer,
  openid_data: openidConnectReducer as unknown as any,
  lookup_mobile: lookupMobileProofingSlice.reducer,
  identities: identitiesSlice.reducer,
  openid_freja_data: openidConnectFrejaReducer as unknown as any,
  personal_data: personalDataSlice.reducer,
  phones: phonesSlice.reducer,
  letter_proofing: letterProofingSlice.reducer,
  notifications: notificationsSlice.reducer,
  account_linking: accountLinkingSlice.reducer,
  security: securityReducer,
  ladok: ladokSlice.reducer,
  form: formReducer,
  intl: intlReducer,
});

export default eduIDApp;
