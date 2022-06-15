import { combineReducers } from "redux";
import { intlReducer } from "./reducers/Internationalisation";
import { reducer as formReducer } from "redux-form";
import personalDataSlice from "reducers/PersonalData";
import emailsSlice from "reducers/Emails";
import configSlice from "reducers/DashboardConfig";
import openidConnectReducer from "reducers/OpenidConnect";
import lookupMobileProofingSlice from "reducers/LookupMobileProofing";
import openidConnectFrejaReducer from "reducers/OpenidConnectFreja";
import phonesSlice from "reducers/Phones";
import accountLinkingReducer from "reducers/AccountLinking";
import securityReducer from "reducers/Security";
import chpassSlice from "reducers/ChangePassword";
import identitiesSlice from "reducers/Identities";
import letterProofingSlice from "reducers/LetterProofing";
import { notificationsSlice } from "reducers/Notifications";
import groupsReducer from "./login/redux/reducers/groupsReducer";
import invitesReducer from "./login/redux/reducers/invitesReducer";
import ladokSlice from "reducers/Ladok";

const eduIDApp = combineReducers({
  chpass: chpassSlice.reducer,
  config: configSlice.reducer,
  emails: emailsSlice.reducer,
  groups: groupsReducer as unknown as any,
  invites: invitesReducer as unknown as any,
  openid_data: openidConnectReducer as unknown as any,
  lookup_mobile: lookupMobileProofingSlice.reducer,
  identities: identitiesSlice.reducer,
  openid_freja_data: openidConnectFrejaReducer as unknown as any,
  personal_data: personalDataSlice.reducer,
  phones: phonesSlice.reducer,
  letter_proofing: letterProofingSlice.reducer,
  notifications: notificationsSlice.reducer,
  account_linking: accountLinkingReducer,
  security: securityReducer,
  ladok: ladokSlice.reducer,
  form: formReducer,
  intl: intlReducer,
});

export default eduIDApp;
