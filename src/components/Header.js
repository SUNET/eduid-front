import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "../login/styles/index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
  render() {
    const url = location.pathname;
    let tagline = this.props.translate("banner.tagline");
    let button = "";

    if (url.includes("register")) {
      button = (
        <a href={this.props.dashboard_url}>
          <button id="login">
            <FontAwesomeIcon icon={faUser}/>
            {this.props.translate("header.signin")}
          </button>
        </a>
      );
    } else if (url.includes("profile")) {
      tagline = (
        <Fragment>
          {this.props.translate("dashboard.tagline")} {this.props.email}
        </Fragment>
      );
      button = (
        <div id="eduid-button">
          <button id="logout" onClick={this.props.handleLogout}>
            {this.props.translate("header.logout")}
          </button>
        </div>
      );
    } else {
      button = <div />;
    }

    return (
      <section className="banner">
        <header>
          <a href={this.props.dashboard_url}>
            <div id="eduid-logo" />
          </a>
          {button}
        </header>
        <div className="vertical-content-margin">
          <h1 className="tagline">{tagline}</h1>
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
