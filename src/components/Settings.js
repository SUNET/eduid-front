import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";
import { Collapse } from "reactstrap";

import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import PersonalDataContainer from "containers/PersonalData";
import NinsContainer from "containers/Nins";
import EmailsContainer from "containers/Emails";
import MobileContainer from "containers/Mobile";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
import ChangePasswordContainer from "containers/ChangePassword";
import NotificationsContainer from "containers/Notifications";
import ProfileFilledContainer from "containers/ProfileFilled";
import PendingActionsContainer from "containers/PendingActions";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

export const history = createHistory();

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fetching: props.is_fetching,
      // setFetching: this.setFetching.bind(this),
      // openTabs: false
    };
  }

  // setFetching(fetching) {
  //   this.setState({
  //     fetching: fetching
  //   });
  // }

  // componentWillMount() {
  //   window.addEventListener("resize", this.props.handleWindowSizeChange);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.props.handleWindowSizeChange);
  // }

  render() {
    // let contentElem = "";

    // const routesElem = notsElem => (

    // );

    // if (this.props.show !== true) {
    //   return <div />;
    // }
    // if (this.props.show_sidebar) {
    // const size = this.props.window_size,
    //   sm = size === "sm",
    // tabs = [
    //   {
    //     id: "personaldata",
    //     label: sm ? "main.personal_data_label_sm" : "main.personal_data"
    //   },
    //   { id: "nins", label: sm ? "main.nins_label_sm" : "main.nins" },
    //   { id: "emails", label: sm ? "main.emails_label_sm" : "main.emails" },
    //   { id: "phones", label: sm ? "main.phones_label_sm" : "main.phones" },
    //   {
    //     id: "accountlinking",
    //     label: sm ? "main.account_linking_label_sm" : "main.account_linking"
    //   },
    //   {
    //     id: "security",
    //     label: sm ? "main.security_label_sm" : "main.security"
    //   }
    // ],
    // profElem = (
    //   <div className="col-sm-12">
    //     <ul className="nav nav-stacked nav-tabs navbar-nav">
    //       <ProfileFilledContainer />
    //       <li id="profile-menu-eppn-li">
    //         <div className="profile-menu-eppn">
    //           <p className="eppn-text-muted">
    //             {/* {this.props.l10n("main.eduid_id")}: {this.props.eppn} */}
    //             main.eduid_id: eppn
    //           </p>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // ),
    // tabsElems = classes => {
    //   return tabs.map((tab, index) => {
    //     return (
    //       <li className="nav-item" key={index}>
    //         <NavLink
    //           className={classes}
    //           activeClassName="active"
    //           onClick={() => this.setState({ openTabs: false })}
    //           to={`/profile/${tab.id}`}
    //           id={`${tab.id}-router-link`}
    //         >
    //           {/* {this.props.l10n(tab.label)} */}
    //           tab.label
    //         </NavLink>
    //       </li>
    //     );
    //   });
    // };
    // if (size === "xl" || size === "lg" || size === "md") {
    //   contentElem = (

    //   );
    // }
    //  }

    // else {
    //   contentElem = routesElem(<NotificationsContainer />);
    // }

    return (
      <div>
        <SplashContainer />
        <div className="container-fluid">
          <NotificationsContainer />

          <div id="content-block">
            <div
              className="tabbable well profile-combo"
              id="profile-content-area"
            >
              <div className="row">
                <div className="tab-content col-md-9 col-md-offset-1 col-sm-12">
                  <Route
                    exact
                    path="/profile/settings/"
                    component={() => (
                      <Redirect to="/profile/settings/personaldata" />
                    )}
                  />
                  <Route
                    path="/profile/settings/personaldata"
                    component={PersonalDataContainer}
                  />
                  <Route
                    path="/profile/settings/nins"
                    component={NinsContainer}
                  />
                  <Route
                    path="/profile/settings/emails"
                    component={EmailsContainer}
                  />
                  <Route
                    path="/profile/settings/phones"
                    component={MobileContainer}
                  />
                  <Route
                    path="/profile/settings/accountlinking"
                    component={AccountLinkingContainer}
                  />
                  <Route
                    path="/profile/settings/security"
                    component={SecurityContainer}
                  />
                  <Route
                    path="/profile/settings/chpass"
                    component={ChangePasswordContainer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Main.propTypes = {
//   window_size: PropTypes.string,
//   show_sidebar: PropTypes.bool,
//   eppn: PropTypes.string,
//   handleWindowSizeChange: PropTypes.func,
//   messages: PropTypes.object
// };

export default Settings;
