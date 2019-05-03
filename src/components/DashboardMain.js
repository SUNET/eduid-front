import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Route, Link, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";
// import { Collapse } from "reactstrap";

import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import SettingsComponent from "./Settings";
import SettingsButton from "./SettingsButton";
import VerifyIdentity from "./VerifyIdentity";
// import PersonalDataContainer from "containers/PersonalData";
import NinsContainer from "containers/Nins";
// import EmailsContainer from "containers/Emails";
// import MobileContainer from "containers/Mobile";
// import AccountLinkingContainer from "containers/AccountLinking";
// import SecurityContainer from "containers/Security";
// import ChangePasswordContainer from "containers/ChangePassword";
// import NotificationsContainer from "containers/Notifications";
// import ProfileFilledContainer from "containers/ProfileFilled";
// import PendingActionsContainer from "containers/PendingActions";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

export const history = createHistory();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: props.is_fetching,
      setFetching: this.setFetching.bind(this)
    };
  }

  setFetching(fetching) {
    this.setState({
      fetching: fetching
    });
  }

  render() {
    return (
      <FetchingContext.Provider value={this.state}>
        <SplashContainer />
        <div className="container-fluid">
          <HeaderContainer />
          <ConnectedRouter history={history}>
            <div id="content-block">
              <SettingsButton />
              <div id="dashboard-text">
                <h1>eduID for email@email.com</h1>
                <p>
                  {" "}
                  Welcome to your eduid account. To be able to use it you need
                  to provide some more information.
                </p>
                <div id="content">
                  <div id="welcome">
                    <Route exact path="/profile/" component={VerifyIdentity} />
                    <Route
                      path="/profile/settings/"
                      component={SettingsComponent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ConnectedRouter>
        </div>
        <FooterContainer />
      </FetchingContext.Provider>
    );
  }
}

Main.propTypes = {
  show_sidebar: PropTypes.bool,
  eppn: PropTypes.string,
  messages: PropTypes.object
};

export default Main;
