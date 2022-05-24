import AccountId from "containers/AccountId";
import AccountLinkingContainer from "containers/AccountLinking";
import DeleteAccount from "containers/DeleteAccount";
import Emails from "components/Emails";
import Phones from "components/Phones";
import SecurityComponent from "components/Security";
import React, { Component, Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import GroupManagement from "../login/components/GroupManagement/GroupManagement";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import LadokContainer from "./Ladok";

const RenderGroups = () => {
  // functionality to be removed when groups feature is released
  const showComponent = useSelector((state) => state.groups.hasCookie);
  return (
    <Fragment>{showComponent && <Route path="/profile/settings/personaldata" component={GroupManagement} />}</Fragment>
  );
};

class Settings extends Component {
  render() {
    return (
      <div>
        <Route exact path="/profile/settings/" component={() => <Redirect to="/profile/settings/personaldata" />} />
        <Route path="/profile/settings/personaldata" render={(props) => <PersonalDataParent {...props} />} />
        <Route path="/profile/settings/personaldata" component={Emails} />
        <Route path="/profile/settings/personaldata" component={Phones} />
        <RenderGroups />
        <Route path="/profile/settings/personaldata" component={ChangePasswordDisplay} />
        <Route path="/profile/settings/personaldata" component={DeleteAccount} />
        <Route path="/profile/settings/advanced-settings" component={SecurityComponent} />
        <Route path="/profile/settings/advanced-settings" component={AccountLinkingContainer} />
        <Route path="/profile/settings/advanced-settings" component={LadokContainer} />
        <Route path="/profile/settings/advanced-settings" component={AccountId} />
      </div>
    );
  }
}

export default i18n(Settings);
