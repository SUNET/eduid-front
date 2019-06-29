import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class DashboardNav extends Component {
  render() {
    const url = window.location.href;
    if (url.includes("settings")) {
      return (
        <nav id="settings-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                activeClassName="active"
                to={`/profile/`}
              >
                <h5>eduid Profile</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={`/profile/settings/`}
              >
                <h5>Settings</h5>
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={`/profile/settings/personaldata`}
              >
                <h5> > Personal information</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={`/profile/settings/advanced-settings`}
              >
                <h5> > Advanced settings</h5>
              </NavLink>
            </li>
          </ul>
        </nav>
      );
    } else if (url.includes("verify-identity")) {
      return (
        <nav id="settings-nav" className="nav-back">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                activeClassName="active"
                to={`/profile/`}
              >
                <h5> back > </h5>
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
                exact
                activeClassName="active"
                to={`/profile/`}
              >
                <h5>eduid Profile</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to={`/profile/settings/`}
              >
                <h5>Settings</h5>
              </NavLink>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default DashboardNav;