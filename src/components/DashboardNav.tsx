import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import Splash from "./Splash";
import { Squash as Hamburger } from "hamburger-react";
import React, { Fragment, useState } from "react";

// export for use in tests
export const activeClassName = "active";
export const dashboardHeading = "eduID Dashboard:";

const [isOpen, setOpen] = useState(false);

function DashboardNav(): JSX.Element {
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

  return (
    <nav id="dashboard-nav">
      <Splash showChildren={isLoaded} className="nav-splash-spinner">
        <ul className="horizontal-content-margin">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClassName : undefined)}
              to="/profile/"
              onClick={() => (toggle = { setOpen })}
              end
            >
              <FormattedMessage defaultMessage="Profile" description="Dashboard nav tab name" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClassName : undefined)}
              to="/profile/verify-identity/"
            >
              <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClassName : undefined)}
              to="/profile/settings/personaldata"
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
