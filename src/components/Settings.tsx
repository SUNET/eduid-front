import AccountId from "containers/AccountId";
import AccountLinkingContainer from "containers/AccountLinking";
import DeleteAccount from "containers/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import SecurityContainer from "containers/Security";
import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import GroupManagement from "../login/components/GroupManagement/GroupManagement";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import LadokContainer from "./Ladok";

const RenderGroups = () => {
  // functionality to be removed when groups feature is released
  const showComponent = false;
  return (
    <Fragment>{showComponent && <Route path="/profile/settings/personaldata" component={GroupManagement} />}</Fragment>
  );
};

export function Settings(): JSX.Element {
  return (
    <div>
      <Route exact path="/profile/settings/" component={() => <Redirect to="/profile/settings/personaldata" />} />
      <Route path="/profile/settings/personaldata" component={PersonalDataParent} />
      <Route path="/profile/settings/personaldata" component={Emails} />
      <Route path="/profile/settings/personaldata" component={Phones} />
      <RenderGroups />
      <Route path="/profile/settings/personaldata" component={ChangePasswordDisplay} />
      <Route path="/profile/settings/personaldata" component={DeleteAccount} />
      <Route path="/profile/settings/advanced-settings" component={SecurityContainer} />
      <Route path="/profile/settings/advanced-settings" component={AccountLinkingContainer} />
      <Route path="/profile/settings/advanced-settings" component={LadokContainer} />
      <Route path="/profile/settings/advanced-settings" component={AccountId} />
    </div>
  );
}
