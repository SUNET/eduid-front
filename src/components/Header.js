import React, { Component } from "react";
import PropTypes from "prop-types";
import "../login/styles/index.scss";
import "style/Header.scss";

class Header extends Component {
  render() {
    const url = location.pathname;
    let tagline = "";
    let button = "";
 
    if (url.includes("register")) {
      tagline = "eduID är enklare och säkrare inloggning.";
      button = (
        <a href={this.props.dashboard_url}>
          <button id="login" className="btn">
            {this.props.translate("header.signin")}
          </button>
        </a>
      );
      
    } else if (url.includes("profile")) {
      tagline = this.props.translate("dashboard.welcome");
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
      <section class="banner">
        <header id="header">
          <a href={this.props.dashboard_url}>
            <div id="eduid-logo" />
          </a>
          {button}
        </header>
        <div className="vertical-content-margin">
          <h1 className="tagline">
            {tagline} {this.props.email}
          </h1>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  gotoSignin: PropTypes.func,
  translate: PropTypes.func,
  confirmed: PropTypes.string,
};

export default Header;
