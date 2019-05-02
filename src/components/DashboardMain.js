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
      setFetching: this.setFetching.bind(this),
      // show_settings: false,
      openTabs: false,
      show_sidebar: true,
      show_settings: false,
      window_size: "lg"
    };
  }

  setFetching(fetching) {
    this.setState({
      fetching: fetching
    });
  }

  // showSettings() {
  //   console.log("you clicked the settings button");
  // }

  render() {
    return (
      <FetchingContext.Provider value={this.state}>
        <SplashContainer />
        <div className="container-fluid">
          <HeaderContainer />
          <ConnectedRouter history={history}>
            <div id="content-block">
              <Link
                className="button"
                // activeClassName="active"
                id="submit-button-link"
                to={`/profile/settings/`}
              >
                <button
                  id="settings-button"
                  type="submit"
                  // onClick={() => this.showSettings()}
                >
                  Settings
                </button>
              </Link>
              <div id="dashboard-text">
                {/* <SettingsComponent
                  // show={this.state.show_settings}
                  show_sidebar={this.state.show_sidebar}
                  window_size={this.state.window_size}
                /> */}
                <h1>eduID for email@email.com</h1>
                <p>
                  {" "}
                  Welcome to your eduid account. To be able to use it you
                  need to provide some more information.
                </p>
                <div id="content">
                  <Route
                    path="/profile/settings/"
                    component={SettingsComponent}
                  />
                  <div id="welcome">
                    <div id="verify-identity-prompt">
                      <h3>
                        {" "}
                        You're almost done, the next step is to verify your
                        identity{" "}
                      </h3>
                      <p>
                        {" "}
                        Choose a suitable way to verify your identity and
                        follow the instuctions to start using eduID. You can
                        change any of your personal information in Settings.
                      </p>
                      <div id="verify-identity-button">
                        <button
                          id="verify-button"
                          type="submit"
                          // onClick={() => this.showVerifyIdentity()}
                        >
                          {" "}
                          I want to verify my identity
                        </button>
                        {/* {this.props.l10n(tab.label)} */}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3>Why do I need eduID?</h3>
                    <p>
                      eduID kan användas för inloggning inom flera olika
                      organisationer. eduID har utvecklats för att kunna ge
                      alla studenter en identitet online utan att kräva ett
                      svenskt personnummer.
                    </p>
                    <h3>How to use eduID</h3>
                    <p>
                      När möjlighet finns, välj "Logga in med eduID". Du
                      kommer att bli skickad till eduIDs login där du anger
                      din e-postadress och ditt lösenord.
                    </p>
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
  // window_size: PropTypes.string,
  show_sidebar: PropTypes.bool,
  eppn: PropTypes.string,
  // handleWindowSizeChange: PropTypes.func,
  messages: PropTypes.object
};

export default Main;
