import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import SplashContainer from "containers/Splash";
import NotificationsContainer from "containers/Notifications";
import FooterContainer from "containers/Footer";
import HeaderContainer from "containers/HeaderAnon";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/SignupMain.scss";

export const history = createHistory();

export const FetchingContext = React.createContext({
  fetching: false,
  setFetching: () => {}
});

class ActionWrapper extends Component {
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

  componentWillMount() {
    window.addEventListener(
      "resize",
      this.props.handleWindowSizeChange.bind(this)
    );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.props.handleWindowSizeChange);
  }

  render() {
    return (
      <FetchingContext.Provider value={this.state}>
        <SplashContainer />
        <Router history={history}>
          <div className="dashboard-wrapper">
            <HeaderContainer />
            <div id="dashboard-text">
              <div id="welcome">
                <h1>{this.props.l10n("main.welcome")}</h1>
                <h2>{this.props.l10n("register.create-account")}</h2>
              </div>

              <div id="content">
                <NotificationsContainer />
                {/* <h2>{this.props.l10n("tou.header")}</h2> */}
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
      </FetchingContext.Provider>
    );
  }
}

ActionWrapper.propTypes = {
  handleWindowSizeChange: PropTypes.func,
  redirect: PropTypes.string,
  resize_timeout: PropTypes.number,
  is_fetching: PropTypes.bool
};

export default ActionWrapper;
