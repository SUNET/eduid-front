import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightFromBracket, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

// export for use in tests
export const activeClassName = "active";
export const dashboardHeading = "eduID Dashboard:";

export interface HeaderNavProps {
  handleLogout: () => void;
  login_url?: string;
}

export interface RenderUserNameProps {
  setOpenMenu(value: boolean): void;
  openMenu: boolean;
}

function RenderUserName(props: RenderUserNameProps): JSX.Element | null {
  const emails = useDashboardAppSelector((state) => state.emails.emails);

  if (!emails.length) {
    return null;
  }

  return (
    <React.Fragment>
      <button className="header-user" onClick={() => props.setOpenMenu(!props.openMenu)}>
        <span>{emails.filter((mail) => mail.primary)[0].email}</span>
        {props.openMenu ? (
          <FontAwesomeIcon icon={faChevronUp as IconProp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown as IconProp} />
        )}
      </button>
    </React.Fragment>
  );
}

export function HeaderNav(props: HeaderNavProps): JSX.Element {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <nav id="header-nav" className="header-nav">
      <RenderUserName setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <div className={openMenu ? "nav-menu active" : "nav-menu"}>
        <EduIDButton buttonstyle="close" size="sm" onClick={() => setOpenMenu(false)}></EduIDButton>
        <ul>
          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to="/profile/"
            end
          >
            <FormattedMessage defaultMessage="Profile" description="Dashboard nav tab name" />
          </NavLink>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to="/profile/verify-identity/"
          >
            <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
          </NavLink>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to="/profile/settings/personaldata"
          >
            <FormattedMessage defaultMessage="Settings" description="Dashboard nav tab name" />
          </NavLink>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to="/profile/settings/advanced-settings"
          >
            <FormattedMessage defaultMessage="Advanced settings" description="Dashboard nav tab name" />
          </NavLink>

          <EduIDButton
            buttonstyle="link"
            size="sm"
            id="logout"
            onClick={props.handleLogout}
            disabled={!props.login_url}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
            <FormattedMessage defaultMessage="Log out" description="Header logout" />
          </EduIDButton>
        </ul>
      </div>
    </nav>
  );
}
