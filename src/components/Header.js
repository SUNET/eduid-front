import React, { Component } from "react";
import PropTypes from "prop-types";
import "../login/styles/index.scss";
import "style/Header.scss";


class Header extends Component {
  render() {
    const url = location.pathname;
    let button = "";
    if (url.includes("register")) {
      button = (
        <a href={this.props.dashboard_url}>
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
      <header id="header">
        <a href={this.props.dashboard_url}>
          <div id="eduid-logo" />
        </a>
        {button}
      </header>
    );
  }
}

Header.propTypes = {
  gotoSignin: PropTypes.func,
  translate: PropTypes.func,
  confirmed: PropTypes.string,
};

export default Header;
