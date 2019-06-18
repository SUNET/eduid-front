import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class DashboardNav extends Component {
  render() {
    return (
      <nav id="settings-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              // id="settings-personal-info"
              to={`/profile/settings/verify-identity`}
            >
              <h5>Verify identity</h5>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              id="settings-account-linking"
              to={`/profile/settings/security`}
            >
              <h5>Added security</h5>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}


export default DashboardNav;
