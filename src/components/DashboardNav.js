import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import NotificationTip from "../login/components/NotificationTip/NotificationTip";
import i18n from "../login/translation/InjectIntl_HOC_factory";

function DashboardNav(props) {
  return (
    <nav id="dashboard-nav">
      <ul>
        <NavLink exact activeClassName="active" to={`/profile/`}>
          <li>{props.translate("dashboard_nav.profile")}</li>
        </NavLink>
        <NavLink
          exact
          activeClassName="active"
          to={`/profile/verify-identity/`}
        >
          <li>
            {props.translate("dashboard_nav.identity")}
            <NotificationTip />
          </li>
        </NavLink>
        <NavLink activeClassName="active" to={`/profile/settings/`}>
          <li>
            {props.translate("dashboard_nav.settings")}
            <NotificationTip />
          </li>
        </NavLink>
        <NavLink
          activeClassName="active"
          to={`/profile/settings/advanced-settings`}
        >
          <li>{props.translate("dashboard_nav.advanced-settings")}</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default i18n(withRouter(DashboardNav));
