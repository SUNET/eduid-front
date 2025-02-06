import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightFromBracket, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EduIDButton from "components/Common/EduIDButton";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH, START_PATH } from "components/IndexMain";
import { useAppSelector } from "eduid-hooks";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

// export for use in tests
export const activeClassName = "active";
type ButtonKey = "identity" | "security" | "account";

export interface HeaderNavProps {
  handleLogout: () => void;
  login_url?: string;
}

export interface RenderUserNameProps {
  setOpenMenu(value: boolean): void;
  openMenu: boolean;
}

function RenderUserName(props: RenderUserNameProps): JSX.Element | null {
  const emails = useAppSelector((state) => state.emails.emails);

  if (!emails.length) {
    return null;
  }

  return (
    <button
      className="header-user"
      aria-expanded={props.openMenu}
      type="button"
      onClick={() => props.setOpenMenu(!props.openMenu)}
      data-name={emails.filter((mail) => mail.primary)[0].email}
    >
      <span>{emails.filter((mail) => mail.primary)[0].email}</span>
      {props.openMenu ? (
        <FontAwesomeIcon icon={faChevronUp as IconProp} />
      ) : (
        <FontAwesomeIcon icon={faChevronDown as IconProp} />
      )}
    </button>
  );
}

function useCloseMenuClickOutside(ref: React.RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: TouchEvent | MouseEvent) => {
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
  const [isOpen, setIsOpen] = useState<{ [key in ButtonKey]: boolean }>({
    identity: false,
    security: false,
    account: false,
  });
  const wrapperRef = useRef(null);

  const toggleOpen = (button: ButtonKey) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [button]: !prevState[button],
    }));
  };

  useCloseMenuClickOutside(wrapperRef, () => setOpenMenu(false));
  return (
    <nav className="header-nav" ref={wrapperRef}>
      <RenderUserName setOpenMenu={setOpenMenu} openMenu={openMenu} />
      <div className={openMenu ? "nav-menu active" : "nav-menu"}>
        <EduIDButton buttonstyle="close" size="sm" onClick={() => setOpenMenu(false)}></EduIDButton>
        <ul>
          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={START_PATH}
            end
          >
            <FormattedMessage defaultMessage="Start" description="Dashboard nav tab name" />
          </NavLink>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={IDENTITY_PATH}
          >
            <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
          </NavLink>
          <button onClick={() => toggleOpen("identity")}>
            {isOpen.identity ? (
              <FontAwesomeIcon icon={faChevronUp as IconProp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown as IconProp} />
            )}
          </button>
          <div className={isOpen.identity ? "panel-collapse" : "panel-collapse panel-close"}>
            <ul>
              <li> Verify Identity</li>
              <li>Names & Display Name</li>
            </ul>
          </div>
          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={SECURITY_PATH}
          >
            <FormattedMessage defaultMessage="Security" description="Dashboard nav tab name" />
          </NavLink>

          <button onClick={() => toggleOpen("security")}>
            {isOpen.security ? (
              <FontAwesomeIcon icon={faChevronUp as IconProp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown as IconProp} />
            )}
          </button>
          <div className={isOpen.security ? "panel-collapse" : "panel-collapse panel-close"}>
            <ul>
              <li>Two-factor Authentication (2FA)</li>
              <li>Manage your security keys</li>
            </ul>
          </div>

          <NavLink
            onClick={() => setOpenMenu(false)}
            className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
            to={ACCOUNT_PATH}
          >
            <FormattedMessage defaultMessage="Account" description="Dashboard nav tab name" />
          </NavLink>
          <button onClick={() => toggleOpen("account")}>
            {isOpen.account ? (
              <FontAwesomeIcon icon={faChevronUp as IconProp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown as IconProp} />
            )}
          </button>
          <div className={isOpen.account ? "panel-collapse" : "panel-collapse panel-close"}>
            <ul>
              <li>Unique ID</li>
              <li>Email addresses</li>
              <li>Language</li>
              <li>Change password</li>
              <li>ORCID account</li>
              <li>ESI information</li>
              <li>Delete eduID</li>
            </ul>
          </div>
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
