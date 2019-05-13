import React, { Component } from "react";
import PropTypes from "prop-types";
import { Collapse } from "reactstrap";

import "style/Header.scss";

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.toggle = this.toggle.bind(this);
  //   this.state = { collapse: true };
  // }

  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }

  render() {
    // let email = this.props.email;
    // if (email === "") {
    //   email = this.props.l10n("main.no-email-yet");
    // }

    const logout = (
      <div id="eduid-button">
        <button
          id="logout"
          // className="button"
          onClick={this.props.handleLogout}
        >
          {this.props.l10n("header.logout")}
        </button>
        {/* <div className="loa-big hidden-sm" id="eduid-header-loa">
          {email} ({this.props.l10n(this.props.confirmed)})
        </div>  */}
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

    // if (this.props.size === "xs") {
    //   return (
    //     <header className="header">
    //       <nav className="navbar navbar-dark bg-dark">
    //         <a className="navbar-brand" href="#">
    //           <div id="eduid-logo" />
    //         </a>
    //         <button
    //           className="navbar-toggler"
    //           type="button"
    //           onClick={this.toggle}
    //         >
    //           <span className="navbar-toggler-icon" />
    //         </button>
    //       </nav>
    //       <Collapse
    //         isOpen={!this.state.collapse}
    //         className="text-center"
    //         id="eduid-menu"
    //       >
    //         <nav className="navbar navbar-dark bg-dark" id="eduid-navbar">
    //           {links}
    //           {buttons}
    //         </nav>
    //       </Collapse>
    //     </header>
    //   );
    // } else {
    return (
      <header>
        <div id="eduid-logo" />
        <nav id="eduid-nav">{navMenu}</nav>
        {logout}
      </header>
    );
    //   }
  }
}

Header.propTypes = {
  email: PropTypes.string,
  confirmed: PropTypes.string,
  studentsLink: PropTypes.string,
  techniciansLink: PropTypes.string,
  staffLink: PropTypes.string,
  faqLink: PropTypes.string
};

export default Header;
