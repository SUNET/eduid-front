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
        <nav id="dashboard-nav">
          <ul className="navbar-nav">
            <NavLink
              exact
              activeClassName="active"
              className="nav-link"
              to={`/profile/`}
            >
              <li className="nav-item">
                <h5>Profile</h5>
              </li>
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={`/profile/settings/`}
            >
              <li className="nav-item">
                <h5>Settings</h5>
              </li>
            </NavLink>
          {/* </ul> */}
          {/* <ul className="navbar-nav sub-nav">
            <NavLink
              activeClassName="active"
              className="nav-link personal-info"
              to={`/profile/settings/personaldata`}
            >
              <li className="nav-item">
                <h5> > Personal information</h5>
              </li>
            </NavLink> */}
            <NavLink
              activeClassName="active"
              className="nav-link advanced-setting"
              to={`/profile/settings/advanced-settings`}
            >
              <li className="nav-item">
                <h5> > Advanced settings</h5>
              </li>
            </NavLink>
          </ul>
        </nav>
      );
    } else if (url.includes("verify-identity")) {
      return (
        <nav id="dashboard-nav" className="nav-back">
          <ul className="navbar-nav">
            <NavLink
              exact
              activeClassName="active"
              className="nav-link"
              to={`/profile/`}
            >
              <li className="nav-item">
                <h5> back > </h5>
              </li>
            </NavLink>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav id="dashboard-nav">
          <ul className="navbar-nav">
            <NavLink
              exact
              activeClassName="active"
              className="nav-link"
              to={`/profile/`}
            >
              <li className="nav-item">
                <h5>eduid Profile</h5>
              </li>
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={`/profile/settings/`}
            >
              <li className="nav-item">
                <h5>Settings</h5>
              </li>
            </NavLink>
          </ul>
        </nav>
      );
    }
  }
}

export default DashboardNav;
