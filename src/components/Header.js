import React, { Component } from "react";
import PropTypes from "prop-types";
import "style/Header.scss";

class Header extends Component {
  render() {
    const url = location.pathname;
    let button = "";
    if (url.includes("register")) {
      button = (
        <a href="http://html.eduid.docker/">
          <button id="login" className="btn">
            {this.props.translate("header.signin")}
          </button>
        </a>
      );
    } else if (url.includes("profile")) {
      button = (
        <div id="eduid-button">
          <button id="logout" className="btn" onClick={this.props.handleLogout}>
            {this.props.translate("header.logout")}
          </button>
        </div>
      );
    } else {
      button = <div />;
    }

    return (
      <header>
        <a href="http://html.eduid.docker/">
          <div id="eduid-logo" />
        </a>
        {button}
      </header>
    );
  }
}

Header.propTypes = {
  gotoSignin: PropTypes.func,
  l10n: PropTypes.func,
  confirmed: PropTypes.string
};

export default Header;
