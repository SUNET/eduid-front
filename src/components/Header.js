import React, { Component } from "react";
import PropTypes from "prop-types";

import "style/Header.scss";

class Header extends Component {
  render() {
    let login = (
      <div data-dashboard_url={this.props.dashboard_url}>
        <a onClick={this.props.gotoSignin}>
          <button id="login" className="btn">
            {this.props.l10n("header.signin")}
          </button>
        </a>
      </div>
    );

    const logout = (
      <div id="eduid-button">
        <button id="logout" className="btn" onClick={this.props.handleLogout}>
          {this.props.l10n("header.logout")}
        </button>
      </div>
    );

    return (
      <header>
        <a href="http://html.eduid.docker/">
          <div id="eduid-logo" />
        </a>
        {logout}
      </header>
    );
  }
}

Header.propTypes = {
  withButtons: PropTypes.bool,
  size: PropTypes.string,
  // gotoSignup: PropTypes.func,
  gotoSignin: PropTypes.func,
  l10n: PropTypes.func,
  confirmed: PropTypes.string
  // studentsLink: PropTypes.string,
  // techniciansLink: PropTypes.string,
  // staffLink: PropTypes.string,
  // faqLink: PropTypes.string
};

export default Header;
