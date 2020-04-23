import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import i18n from "../login/translation/InjectIntl_HOC_factory";

class DashboardNav extends Component {
  render() {
    const url = location.pathname;
    if (url.includes("chpass")) {
      return (
        <nav id="dashboard-nav">
          <ul>
            <NavLink exact to={`/profile/`}>
              <li>{this.props.translate("dashboard_nav.back")}</li>
            </NavLink>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav id="dashboard-nav">
          <ul>
            <NavLink exact activeClassName="active" to={`/profile/`}>
              <li>{this.props.translate("dashboard_nav.profile")}</li>
            </NavLink>
            <NavLink
              exact
              activeClassName="active"
              to={`/profile/verify-identity/`}
            >
              <li>
                <span>Identity</span>
              </li>
            </NavLink>
            <NavLink activeClassName="active" to={`/profile/settings/`}>
              <li>{this.props.translate("dashboard_nav.settings")}</li>
            </NavLink>
            <NavLink
              activeClassName="active"
              to={`/profile/settings/advanced-settings`}
            >
              <li>{this.props.translate("dashboard_nav.advanced-settings")}</li>
            </NavLink>
          </ul>
        </nav>
      );
    }
  }
}

export default i18n(withRouter(DashboardNav));
