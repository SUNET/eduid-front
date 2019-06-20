import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class DashboardNav extends Component {
  render() {
    if (!this.props.verifiedNin) {
      return (
        <nav id="settings-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                // id="settings-personal-info"
                to={`/profile/`}
              >
                <h5>Account details</h5>
              </NavLink>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav id="settings-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                // id="settings-personal-info"
                to={`/profile/`}
              >
                <h5>Account details</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-account-linking"
                to={`/profile/security/`}
              >
                <h5>Added security</h5>
              </NavLink>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default DashboardNav;
