import React, { Component } from "react";
import PropTypes from "prop-types";
import Collapse from "reactstrap/lib/Collapse";

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
    const url = window.location.href;
    let buttons = "";
    if (this.props.withButtons) {
      // if (url.includes("register")) {
      buttons = (
        <div data-dashboard_url={this.props.dashboard_url}>
          <a onClick={this.props.gotoSignin}>
            <button id="login" className="btn">
              {this.props.l10n("header.signin")}
            </button>
          </a>
        </div>
      );
      //   } else {
      //     buttons = (
      //       <div className="button orange">
      //         <a onClick={this.props.gotoSignup}>
      //           {this.props.l10n("header.signup")}
      //         </a>
      //       </div>
      //     );
      //   }
    }
    // const links = (

    // );

    // if (this.props.size === "xs") {
    //   return (
    //     <header id="header" className="header">
    //       <nav className="navbar navbar-dark bg-dark">
    //         <a className="navbar-brand" href="#">
    //           <div id="eduid-logo-small" className="logo" />
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
      <header
        id="header"
        // className="header"
      >
        <a href="http://html.eduid.docker/"><div id="eduid-logo" /></a>
        {/* <div className="logo" id="eduid-logo-large" /> */}
        {/* <nav id="eduid-navbar">
          <div
            className=""
            id="eduid-menu"
          > 
          <ul>
            <li>
              <a href={this.props.students_link}>
                {this.props.l10n("header.student")}
              </a>
            </li>
            <li>
              <a href={this.props.technicians_link}>
                {this.props.l10n("header.technician")}
              </a>
            </li>
            <li>
              <a href={this.props.staff_link}>{this.props.l10n("header.staff")}</a>
            </li>
            <li>
              <a href={this.props.faq_link}>{this.props.l10n("header.faq")}</a>
            </li>
          </ul>

           </div> 
        </nav>*/}
          {buttons} 
      </header>
    );
    // }
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
