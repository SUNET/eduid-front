import React, { Component } from "react";
import PropTypes from "prop-types";

import "style/Header.scss";

class Header extends Component {
  render() {
    let  login = (
        <div data-dashboard_url={this.props.dashboard_url}>
          <a onClick={this.props.gotoSignin}>
            <button id="login" className="btn">
              {this.props.l10n("header.signin")}
            </button>
          </a>
        </div>
      );

    return (
      <header>
        <a href="http://html.eduid.docker/">
          <div id="eduid-logo" />
        </a>
        {login}
      </header>
    );
  }
}

Header.propTypes = {
  withButtons: PropTypes.bool,
  size: PropTypes.string,
  l10n: PropTypes.func,
  gotoSignup: PropTypes.func,
  gotoSignin: PropTypes.func
};

export default Header;
