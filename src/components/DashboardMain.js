import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { Route, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";
// import { Collapse } from "reactstrap";

import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import SettingsComponent from "./Settings";
// import PersonalDataContainer from "containers/PersonalData";
// import NinsContainer from "containers/Nins";
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
      show_settings: false,
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

  showSettings() {
    this.setState(
      prevState => ({
        show_settings: !prevState.show_settings
      }),
      console.log("you clicked the settings button")
    );
  }

  // componentWillMount() {
  //   window.addEventListener("resize", this.props.handleWindowSizeChange);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.props.handleWindowSizeChange);
  // }

  render() {
    // let contentElem = "";

    // const routesElem = notsElem => (
    //   <div className="tab-content col-md-9 col-md-offset-1 col-sm-12">
    //     <div className="tab-pane active">
    //       {notsElem}
    //       <Route
    //         exact
    //         path="/profile/"
    //         component={() => <Redirect to="/profile/personaldata" />}
    //       />
    //       <Route
    //         path="/profile/personaldata"
    //         component={PersonalDataContainer}
    //       />
    //       <Route path="/profile/nins" component={NinsContainer} />
    //       <Route path="/profile/emails" component={EmailsContainer} />
    //       <Route path="/profile/phones" component={MobileContainer} />
    //       <Route
    //         path="/profile/accountlinking"
    //         component={AccountLinkingContainer}
    //       />
    //       <Route path="/profile/security" component={SecurityContainer} />
    //       <Route path="/profile/chpass" component={ChangePasswordContainer} />
    //     </div>
    //   </div>
    // );

    // if (this.props.show_sidebar) {
    //   const size = this.props.window_size,
    //     sm = size === "sm",
    //     tabs = [
    //       {
    //         id: "personaldata",
    //         label: sm ? "main.personal_data_label_sm" : "main.personal_data"
    //       },
    //       { id: "nins", label: sm ? "main.nins_label_sm" : "main.nins" },
    //       { id: "emails", label: sm ? "main.emails_label_sm" : "main.emails" },
    //       { id: "phones", label: sm ? "main.phones_label_sm" : "main.phones" },
    //       {
    //         id: "accountlinking",
    //         label: sm ? "main.account_linking_label_sm" : "main.account_linking"
    //       },
    //       {
    //         id: "security",
    //         label: sm ? "main.security_label_sm" : "main.security"
    //       }
    //     ],
    //     profElem = (
    //       <div className="col-sm-12">
    //         <ul className="nav nav-stacked nav-tabs navbar-nav">
    //           <ProfileFilledContainer />
    //           <li id="profile-menu-eppn-li">
    //             <div className="profile-menu-eppn">
    //               <p className="eppn-text-muted">
    //                 {this.props.l10n("main.eduid_id")}: {this.props.eppn}
    //               </p>
    //             </div>
    //           </li>
    //         </ul>
    //       </div>
    //     ),
    //     tabsElems = classes => {
    //       return tabs.map((tab, index) => {
    //         return (
    //           <li className="nav-item" key={index}>
    //             <NavLink
    //               className={classes}
    //               activeClassName="active"
    //               onClick={() => this.setState({ openTabs: false })}
    //               to={`/profile/${tab.id}`}
    //               id={`${tab.id}-router-link`}
    //             >
    //               {this.props.l10n(tab.label)}
    //             </NavLink>
    //           </li>
    //         );
    //       });
    //     };
    //   if (size === "xl" || size === "lg" || size === "md") {
    //     contentElem = (
    //       <div className="row">
    //         <div className="col-md-3">
    //           <div className="profile-head">
    //             <h3>{this.props.l10n("main.profile_title")}</h3>
    //             <PendingActionsContainer history={history} />
    //           </div>

    //           <div
    //             className="tabs-left"
    //             role="navigation"
    //             id="profile-menu-large"
    //           >
    //             <ul className="nav nav-tabs nav-stacked">
    //               {tabsElems("main-nav-tabs nav-link")}
    //               <ProfileFilledContainer />
    //               <li id="profile-menu-eppn-li">
    //                 <div className="profile-menu-eppn">
    //                   <p className="eppn-text-muted">
    //                     {this.props.l10n("main.eduid_id")}: {this.props.eppn}
    //                   </p>
    //                 </div>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //         {routesElem(<NotificationsContainer />)}
    //       </div>
    //     );
    //   } else if (size === "sm") {
    //     contentElem = [
    //       <div className="profile-head">
    //         <div className="row">
    //           <div className="col-sm-4">
    //             <h3>{this.props.l10n("main.profile_title")}</h3>
    //           </div>
    //           <div className="col-sm-1" />
    //           <div className="col-sm-7">
    //             <NotificationsContainer />
    //           </div>
    //         </div>
    //         <div className="row">
    //           <div className="col-sm-1" />
    //           <div className="col-sm-11">
    //             <PendingActionsContainer history={history} />
    //           </div>
    //         </div>
    //       </div>,
    //       <div className="row">
    //         <div className="col-sm-12">
    //           <nav
    //             id="profile-menu-small"
    //             className="navbar navbar-light col-sm-10 col-sm-offset-2"
    //             role="navigation"
    //           >
    //             <ul className="nav nav-tabs">
    //               {tabsElems("main-nav-tabs nav-link")}
    //             </ul>
    //           </nav>
    //         </div>
    //         {routesElem("")}
    //         {profElem}
    //       </div>
    //     ];
    //   } else if (size === "xs") {
    //     contentElem = [
    //       <div className="profile-head">
    //         <div className="row">
    //           <div className="col-xs-4 profile-head">
    //             <h3>{this.props.l10n("main.profile_title")}</h3>
    //           </div>
    //           <div className="col-xs-1" />
    //           <div className="col-xs-7 profile-head">
    //             <NotificationsContainer />
    //           </div>
    //         </div>
    //         <div className="row">
    //           <div className="col-xs-1" />
    //           <div className="col-xs-11 pending-actions-container">
    //             <PendingActionsContainer history={history} />
    //           </div>
    //         </div>
    //       </div>,
    //       <div className="row">
    //         <div id="col-xs-12 profile-navbar-xs">
    //           <nav
    //             id="profile-menu-small"
    //             className="navbar navbar-light"
    //             role="navigation"
    //           >
    //             <a className="navbar-brand" href="#">
    //               {this.props.l10n("main.menu")}
    //             </a>
    //             <button
    //               className="navbar-toggler"
    //               type="button"
    //               onClick={() =>
    //                 this.setState({ openTabs: !this.state.openTabs })
    //               }
    //             >
    //               <span className="navbar-toggler-icon" />
    //             </button>
    //           </nav>
    //         </div>
    //         <Collapse
    //           id="eduid-menu-items-xs"
    //           isOpen={this.state.openTabs}
    //           className="text-center"
    //         >
    //           <nav className="navbar navbar-light bg-light">
    //             <ul className="nav nav-stacked nav-tabs navbar-nav">
    //               {tabsElems("main-nav-tabs tab-link btn-block")}
    //             </ul>
    //           </nav>
    //         </Collapse>
    //         {routesElem("")}
    //         {profElem}
    //       </div>
    //     ];
    //   }
    // } else {
    //   contentElem = routesElem(<NotificationsContainer />);
    // }

    return (
      <FetchingContext.Provider value={this.state}>
        <SplashContainer />
        <div className="container-fluid">
          <HeaderContainer />
          <div id="content-block">
            <button
              id="settings-button"
              type="submit"
              onClick={() => this.showSettings()}
            >
              Settings
            </button>

            <div id="dashboard-text">
              <h1>eduID for email@email.com</h1>
              <p>
                {" "}
                Welcome to your eduid account. To be able to use it you need to
                provide some more information.
              </p>
              <div id="content">
                <div id="welcome">
                  <div id="verify-identity-prompt">
                    <h3>
                      {" "}
                      You're almost done, the next step is to verify your
                      identity{" "}
                    </h3>
                    <p>
                      {" "}
                      Choose a suitable way to verify your identity and follow
                      the instuctions to start using eduID. You can change any
                      of your personal information in Settings.
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
                  <div>
                    <h3>Why do I need eduID?</h3>
                    <p>
                      eduID kan användas för inloggning inom flera olika
                      organisationer. eduID har utvecklats för att kunna ge alla
                      studenter en identitet online utan att kräva ett svenskt
                      personnummer.
                    </p>
                    <h3>How to use eduID</h3>
                    <p>
                      När möjlighet finns, välj "Logga in med eduID". Du kommer
                      att bli skickad till eduIDs login där du anger din
                      e-postadress och ditt lösenord.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ConnectedRouter history={history}>
            <SettingsComponent
              show={this.state.show_settings}
              show_sidebar={this.state.show_sidebar}
              window_size={this.state.window_size}
            />
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
