import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import SplashContainer from "containers/Splash";
import NotificationsContainer from "containers/Notifications";
import FooterContainer from "containers/Footer";
import HeaderContainer from "containers/Header";

// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../login/styles/index.scss";

export const history = createBrowserHistory();

//export const FetchingContext = React.createContext({
//fetching: false,
//setFetching: () => {}
//});

class ActionMain extends Component {
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

  // XXX <FetchingContext.Provider value={this.state}> ... </FetchingContext.Provider>
  // should wrap the splash container and router once we get back to using
  // it.
  render() {
    return [
      <SplashContainer key="0" />,
      <Router key="1" history={history}>
        <HeaderContainer {...this.props} />
        <section id="panel">
          <NotificationsContainer />
          <div key="0" id="content" className="vertical-content-margin">
            <Route
              exact
              path={`${BASE_PATH}`}
              component={() => <Redirect to={this.props.redirect} />}
            />
            {this.props.children}
          </div>
        </section>
        <FooterContainer {...this.props} />
      </Router>,
    ];
  }
}

ActionMain.propTypes = {
  redirect: PropTypes.string,
};

export default ActionMain;
