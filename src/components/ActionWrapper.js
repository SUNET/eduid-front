import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route, NavLink, Redirect } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from "history";
import SplashContainer from "containers/Splash";
import NotificationsContainer from "containers/Notifications";
import FooterContainer from "containers/Footer";
import HeaderContainer from "containers/Header";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/SignupMain.scss";

export const history = createBrowserHistory();

//export const FetchingContext = React.createContext({
  //fetching: false,
  //setFetching: () => {}
//});

class ActionWrapper extends Component {
  //constructor(props) {
    //super(props);

    //this.state = {
      //fetching: props.is_fetching,
      //setFetching: this.setFetching.bind(this)
    //};
  //}

  //setFetching(fetching) {
    //this.setState({
      //fetching: fetching
    //});
  //}

  // componentWillMount() {
  //   window.addEventListener(
  //     "resize",
  //     this.props.handleWindowSizeChange.bind(this)
  //   );
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.props.handleWindowSizeChange);
  // }

  render() {
    return (
      <div>
      {/* <FetchingContext.Provider value={this.state}> */}
        <SplashContainer />
        <Router history={history}>
          <div className="dashboard-wrapper">
            <HeaderContainer {...this.props} />
            <div id="dashboard-text">
              <div id="banner">
                <h1 className="banner-tagline">{this.props.l10n("banner.tagline")}</h1>
              </div>

              <div id="content">
                <NotificationsContainer />
                <Route
                  exact
                  path={`${BASE_PATH}`}
                  component={() => <Redirect to={this.props.redirect} />}
                />
                {this.props.children}
              </div>
            </div>
            <FooterContainer {...this.props} />
          </div>
        </Router>
      {/*</FetchingContext.Provider>*/}
      </div>
    );
  }
}

ActionWrapper.propTypes = {
  handleWindowSizeChange: PropTypes.func,
  redirect: PropTypes.string,
  resize_timeout: PropTypes.number,
  //is_fetching: PropTypes.bool
};

export default ActionWrapper;
