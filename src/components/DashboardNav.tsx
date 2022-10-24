import React from "react";
import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import Splash from "./Splash";

// export for use in tests
export const activeClassName = "active";
export const dashboardHeading = "eduID Dashboard:";

interface DashboardNavProps {
  toggle(value: boolean): void;
}

function DashboardNav(props: DashboardNavProps): JSX.Element {
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

  function closeMenu() {
    props.toggle(false);
  }

  return (
    <nav id="dashboard-nav">
      <Splash showChildren={isLoaded} className="nav-splash-spinner">
        <ul className="horizontal-content-margin">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClassName : undefined)}
              to="/profile/"
              onClick={closeMenu}
              end
            >
              <FormattedMessage defaultMessage="Profile" description="Dashboard nav tab name" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClassName : undefined)}
              to="/profile/verify-identity/"
              onClick={closeMenu}
            >
              <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClassName : undefined)}
              to="/profile/settings/personaldata"
              onClick={closeMenu}
            >
              <FormattedMessage defaultMessage="Settings" description="Dashboard nav tab name" />
            </NavLink>
          </li>
        </ul>
      </Splash>
    </nav>
  );
}

export default DashboardNav;
