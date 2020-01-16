import { combineReducers } from "redux";
import { intlReducer } from "react-intl-redux";

import personalDataReducer from "reducers/PersonalData";
import emailsReducer from "reducers/Emails";
import configReducer from "reducers/DashboardConfig";
import openidConnectReducer from "reducers/OpenidConnect";
import lookupMobileProofingReducer from "reducers/LookupMobileProofing";
import openidConnectFrejaReducer from "reducers/OpenidConnectFreja";
import mobileReducer from "reducers/Mobile";
import accountLinkingReducer from "reducers/AccountLinking";
import securityReducer from "reducers/Security";
import chpassReducer from "reducers/ChangePassword";
import ninsReducer from "reducers/Nins";
import letterProofingReducer from "reducers/LetterProofing";
import notificationsReducer from "reducers/Notifications";
import eidasReducer from "reducers/Eidas";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

const eduIDApp = combineReducers({
  router: routerReducer,
  chpass: chpassReducer,
  config: configReducer,
  emails: emailsReducer,
  openid_data: openidConnectReducer,
  lookup_mobile: lookupMobileProofingReducer,
  openid_freja_data: openidConnectFrejaReducer,
  personal_data: personalDataReducer,
  phones: mobileReducer,
  nins: ninsReducer,
  letter_proofing: letterProofingReducer,
  notifications: notificationsReducer,
  account_linking: accountLinkingReducer,
  security: securityReducer,
  eidas_data: eidasReducer,
  form: formReducer,
  intl: intlReducer
});

export default eduIDApp;
