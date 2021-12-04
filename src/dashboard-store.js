import { combineReducers } from "redux";
import { intlReducer } from "./reducers/Internationalisation";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import personalDataSlice from "reducers/PersonalData";
import emailsReducer from "reducers/Emails";
import configReducer from "reducers/DashboardConfig";
import openidConnectReducer from "reducers/OpenidConnect";
import lookupMobileProofingReducer from "reducers/LookupMobileProofing";
import openidConnectFrejaReducer from "reducers/OpenidConnectFreja";
import mobileReducer from "reducers/Mobile";
import accountLinkingReducer from "reducers/AccountLinking";
import securityReducer from "reducers/Security";
import chpassReducer from "reducers/ChangePassword";
import ninsSlice from "reducers/Nins";
import letterProofingReducer from "reducers/LetterProofing";
import notificationsReducer from "reducers/Notifications";
import eidasReducer from "reducers/Eidas";
import groupsReducer from "./login/redux/reducers/groupsReducer";
import invitesReducer from "./login/redux/reducers/invitesReducer";

const eduIDApp = combineReducers({
  router: routerReducer,
  chpass: chpassReducer,
  config: configReducer,
  emails: emailsReducer,
  groups: groupsReducer,
  invites: invitesReducer,
  openid_data: openidConnectReducer,
  lookup_mobile: lookupMobileProofingReducer,
  nins: ninsSlice.reducer,
  openid_freja_data: openidConnectFrejaReducer,
  personal_data: personalDataSlice.reducer,
  phones: mobileReducer,
  letter_proofing: letterProofingReducer,
  notifications: notificationsReducer,
  account_linking: accountLinkingReducer,
  security: securityReducer,
  eidas_data: eidasReducer,
  form: formReducer,
  intl: intlReducer,
});

export default eduIDApp;
