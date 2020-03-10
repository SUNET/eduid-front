import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, NavLink, Redirect } from "react-router-dom";
import i18n from "i18n-messages";
import ChangePasswordDisplay from "containers/ChangePasswordDisplay";
import DashboardNav from "./DashboardNav";
import PersonalDataContainer from "containers/PersonalData";
import EmailsContainer from "containers/Emails";
import MobileContainer from "containers/Mobile";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
import DeleteAccount from "containers/DeleteAccount";
import AccountId from "containers/AccountId";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class Settings extends Component {
  render() {
    return (
      <div id="dashboard">
        <DashboardNav {...this.props} />
        <div id="settings-content">
          <Route
            exact
            path="/profile/settings/"
            component={() => <Redirect to="/profile/settings/personaldata" />}
          />
          <Route
            path="/profile/settings/personaldata"
            render={props => <PersonalDataContainer {...props} />}
          />

          <Route
            path="/profile/settings/personaldata"
            component={EmailsContainer}
          />
          <Route
            path="/profile/settings/personaldata"
            component={MobileContainer}
          />
          <Route
            path="/profile/settings/personaldata"
            component={ChangePasswordDisplay}
          />
          <Route
            path="/profile/settings/personaldata"
            component={DeleteAccount}
          />
          <Route
            path="/profile/settings/advanced-settings"
            component={SecurityContainer}
          />
          <Route
            path="/profile/settings/advanced-settings"
            component={AccountLinkingContainer}
          />
          <Route
            path="/profile/settings/advanced-settings"
            component={AccountId}
          />
        </div>
      </div>
    );
  }
}

// export default Settings;
const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default i18n(SettingsContainer);
