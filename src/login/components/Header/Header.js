import React, { Component } from "react";
import PropTypes from "prop-types";

import "../../../style/Header.scss";

class Header extends Component {
  render() {
    let rightCorner = "";
    const url = location.pathname;

    if (url.includes("profile")) {
      rightCorner = (
        <div id="eduid-button">
          <button id="logout" className="btn" onClick={this.props.handleLogout}>
            {this.props.l10n("header.logout")}
          </button>
        </div>
      );
    } else {
      rightCorner = <div />;
    }

    return (
      <section className="banner">
        <header>
          <a href={this.props.dashboard_url}>
            <div id="eduid-logo" />
          </a>
          {rightCorner}
        </header>
        <div className="vertical-content-margin">
          <h1 className="tagline">eduID is easier and safer login.</h1>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  gotoSignin: PropTypes.func,
  l10n: PropTypes.func,
  confirmed: PropTypes.string
};

export default Header;
