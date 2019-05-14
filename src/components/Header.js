import React, { Component } from "react";
import PropTypes from "prop-types";

import "style/Header.scss";

class Header extends Component {
  render() {
    const logout = (
      <div id="eduid-button">
        <button
          id="logout"
          onClick={this.props.handleLogout}
        >
          {this.props.l10n("header.logout")}
        </button>
      </div>
    );

    const navMenu = (
      <ul>
        <li>
          <a href={this.props.studentsLink}>
            {this.props.l10n("header.students")}
          </a>
        </li>
        <li>
          <a href={this.props.techniciansLink}>
            {this.props.l10n("header.technicians")}
          </a>
        </li>
        <li>
          <a href={this.props.staffLink}>{this.props.l10n("header.staff")}</a>
        </li>
        <li>
          <a href={this.props.faqLink}>{this.props.l10n("header.faq")}</a>
        </li>
      </ul>
    );

    return (
      <header>
        <div id="eduid-logo" />
        <nav id="eduid-nav">{navMenu}</nav>
        {logout}
      </header>
    );
  }
}

Header.propTypes = {
  confirmed: PropTypes.string,
  studentsLink: PropTypes.string,
  techniciansLink: PropTypes.string,
  staffLink: PropTypes.string,
  faqLink: PropTypes.string
};

export default Header;
