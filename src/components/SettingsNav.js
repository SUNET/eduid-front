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
              // id="settings-personal-info"
              to={`/profile/settings/personaldata`}
            >
              <h5>Personal information</h5>
            </NavLink>
          </li>
          {/* <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-emails"
                to={`/profile/settings/emails`}
              >
                <h5>Email address</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-phone"
                to={`/profile/settings/phones`}
              >
                <h5>Phone</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-nin"
                to={`/profile/settings/nins`}
              >
                <h5>National identity number</h5>
              </NavLink>
            </li> */}
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
          {/* <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-security"
                to={`/profile/settings/security`}
              >
                <h5>Add Security</h5>
              </NavLink>
            </li> */}
        </ul>
      </nav>
    );
  }
}


export default SettingsNav;
