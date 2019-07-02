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



    return (
      <header>
        <div id="eduid-logo" />
       
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
