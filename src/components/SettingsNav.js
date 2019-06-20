import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class SettingsNav extends Component {
  render() {
    return (
      <nav id="settings-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to={`/profile/settings/personaldata`}
            >
              <h5>Personal information</h5>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              activeClassName="active"
              id="settings-account-linking"
              to={`/profile/settings/advanced-settings`}
            >
              <h5>Advanced settings</h5>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}


export default SettingsNav;
