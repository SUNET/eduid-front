import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightFromBracket, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";
import { advancedSettingsPath, identityPath, settingsPath, startPath } from "./DashboardMain";

// export for use in tests
export const activeClassName = "active";

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
      <button
        className="header-user"
        aria-expanded={props.openMenu}
        type="button"
        onClick={() => props.setOpenMenu(!props.openMenu)}
      >
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

function closeMenuClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export function HeaderNav(props: HeaderNavProps): JSX.Element {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  closeMenuClickOutside(wrapperRef, () => setOpenMenu(false));
  return (
    <nav id="header-nav" className="header-nav" ref={wrapperRef}>
      <RenderUserName setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <div className={openMenu ? "nav-menu active" : "nav-menu"}>
        <EduIDButton buttonstyle="close" size="sm" onClick={() => setOpenMenu(false)}></EduIDButton>
        <ul>
          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={startPath}
            end
          >
            <FormattedMessage defaultMessage="Start" description="Dashboard nav tab name" />
          </NavLink>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={identityPath}
          >
            <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
          </NavLink>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={settingsPath}
          >
            <FormattedMessage defaultMessage="Settings" description="Dashboard nav tab name" />
          </NavLink>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={advancedSettingsPath}
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
