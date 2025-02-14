import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRightFromBracket,
  faBars,
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EduIDButton from "components/Common/EduIDButton";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH, START_PATH } from "components/IndexMain";
import { useAppSelector } from "eduid-hooks";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

// export for use in tests
export const activeClassName = "active";
type ButtonKey = "start" | "identity" | "security" | "account";

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
      {props.openMenu ? <FontAwesomeIcon icon={faXmark as IconProp} /> : <FontAwesomeIcon icon={faBars as IconProp} />}
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
    start: false,
    identity: false,
    security: false,
    account: false,
  });
  const wrapperRef = useRef(null);
  const intl = useIntl();

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
        <ul>
          <div className="flex-between">
            <NavLink
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
              to={START_PATH}
              end
            >
              <FormattedMessage defaultMessage="Start" description="Dashboard nav tab name" />
            </NavLink>
            <button onClick={() => toggleOpen("start")}>
              {isOpen.start ? (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              )}
            </button>
          </div>
          <div className={isOpen.start ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${START_PATH}#status-overview`} end>
                  <FormattedMessage defaultMessage="eduID status overview" description="status overview title" />
                </NavHashLink>
              </li>
            </ul>
          </div>

          <div className="flex-between">
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
          </div>
          <div className={isOpen.identity ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${IDENTITY_PATH}#verify-identity`}>
                  <FormattedMessage defaultMessage="Verify Identity" description="Identity sub menu" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink
                  onClick={() => setOpenMenu(false)}
                  to={`${IDENTITY_PATH}#personal-data`}
                  aria-label="go to manage your security key section"
                >
                  <FormattedMessage description="Names & Display Name" defaultMessage={`Names & Display Name`} />
                </NavHashLink>
              </li>
            </ul>
          </div>
          <div className="flex-between">
            <NavLink
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
              to={SECURITY_PATH}
            >
              <FormattedMessage defaultMessage="Security" description="security main title" />
            </NavLink>

            <button onClick={() => toggleOpen("security")}>
              {isOpen.security ? (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              )}
            </button>
          </div>
          <div className={isOpen.security ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${SECURITY_PATH}#add-two-factor`}>
                  <FormattedMessage defaultMessage="Two-factor Authentication (2FA)" description="security key title" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${SECURITY_PATH}#manage-security-keys`}>
                  <FormattedMessage defaultMessage="Manage your security keys" description="manage your tokens" />
                </NavHashLink>
              </li>
            </ul>
          </div>
          <div className="flex-between">
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
          </div>
          <div className={isOpen.account ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#unique-id`}>
                  <FormattedMessage defaultMessage="Unique ID" description="Dashboard AccountId" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#add-email-addresses`}>
                  <FormattedMessage defaultMessage="Email addresses" description="Emails main title" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#language`}>
                  <FormattedMessage defaultMessage="Language" description="Language" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#change-password`}>
                  <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#orcid`}>
                  <FormattedMessage defaultMessage="ORCID account" description="Dashboard AccountLinking" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#ladok`}>
                  <FormattedMessage defaultMessage="ESI information" description="Ladok account linking" />
                </NavHashLink>
              </li>
              <li>
                <NavHashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#delete-account`}>
                  <FormattedMessage defaultMessage="Delete eduID" description="DeleteAccount" />
                </NavHashLink>
              </li>
            </ul>
          </div>
          <div className="logout-button-wrapper">
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
          </div>
        </ul>
      </div>
    </nav>
  );
}
