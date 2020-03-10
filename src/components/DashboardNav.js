import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import i18n from "../login/translation/InjectIntl_HOC_factory";
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
                <h5>{this.props.translate("dashboard_nav.profile")}</h5>
              </li>
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={`/profile/settings/`}
            >
              <li className="nav-item">
                <h5>{this.props.translate("dashboard_nav.settings")}</h5>
              </li>
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link advanced-setting"
              to={`/profile/settings/advanced-settings`}
            >
              <li className="nav-item">
                <h5>
                  {this.props.translate("dashboard_nav.advanced-settings")}
                </h5>
              </li>
            </NavLink>
          </ul>
        </nav>
      );
    } else if (url.includes("verify-identity") || url.includes("chpass")) {
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
                <h5>{this.props.translate("dashboard_nav.back")}</h5>
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
                <h5>{this.props.translate("dashboard_nav.profile")}</h5>
              </li>
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to={`/profile/settings/`}
            >
              <li className="nav-item">
                <h5>{this.props.translate("dashboard_nav.settings")}</h5>
              </li>
            </NavLink>
            <NavLink className="nav-link advanced-setting transparent" to={`#`}>
              <li className="transparent">
                <h5 className="transparent">
                  {this.props.translate("dashboard_nav.advanced-settings")}
                </h5>
              </li>
            </NavLink>
          </ul>
        </nav>
      );
    }
  }
}

export default i18n(DashboardNav);
