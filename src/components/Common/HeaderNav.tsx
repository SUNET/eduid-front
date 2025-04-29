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
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router";
import { HashLink } from "react-router-hash-link";

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
          <li className="flex-between">
            <NavLink
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
              to={START_PATH}
              end
            >
              <FormattedMessage defaultMessage="Start" description="Dashboard nav tab name" />
            </NavLink>
            <button
              onClick={() => toggleOpen("start")}
              type="button"
              aria-label={isOpen.start ? "open start menu" : "start menu"}
            >
              {isOpen.start ? (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              )}
            </button>
          </li>
          <li className={isOpen.start ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${START_PATH}#status-overview`}>
                  <FormattedMessage defaultMessage="eduID status overview" description="status overview title" />
                </HashLink>
              </li>
            </ul>
          </li>

          <li className="flex-between">
            <NavLink
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
              to={IDENTITY_PATH}
            >
              <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
            </NavLink>
            <button
              onClick={() => toggleOpen("identity")}
              type="button"
              aria-label={isOpen.identity ? "open identity menu" : "start menu"}
            >
              {isOpen.identity ? (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              )}
            </button>
          </li>
          <li className={isOpen.identity ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${IDENTITY_PATH}#verify-identity`}>
                  <FormattedMessage defaultMessage="Verify Identity" description="Identity sub menu" />
                </HashLink>
              </li>
              <li>
                <HashLink
                  onClick={() => setOpenMenu(false)}
                  to={`${IDENTITY_PATH}#personal-data`}
                  aria-label="go to manage your security key section"
                >
                  <FormattedMessage description="Names & Display Name" defaultMessage={`Names & Display Name`} />
                </HashLink>
              </li>
            </ul>
          </li>
          <li className="flex-between">
            <NavLink
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
              to={SECURITY_PATH}
            >
              <FormattedMessage defaultMessage="Security" description="security main title" />
            </NavLink>

            <button
              onClick={() => toggleOpen("security")}
              type="button"
              aria-label={isOpen.security ? "open security menu" : "start menu"}
            >
              {isOpen.security ? (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              )}
            </button>
          </li>
          <li className={isOpen.security ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${SECURITY_PATH}#add-two-factor`}>
                  <FormattedMessage defaultMessage="Two-factor Authentication (2FA)" description="security key title" />
                </HashLink>
              </li>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${SECURITY_PATH}#manage-security-keys`}>
                  <FormattedMessage defaultMessage="Manage your security keys" description="manage your tokens" />
                </HashLink>
              </li>
            </ul>
          </li>
          <li className="flex-between">
            <NavLink
              onClick={() => setOpenMenu(false)}
              className={({ isActive }) => (isActive ? `${activeClassName} menu` : `menu`)}
              to={ACCOUNT_PATH}
            >
              <FormattedMessage defaultMessage="Account" description="Dashboard nav tab name" />
            </NavLink>
            <button
              onClick={() => toggleOpen("account")}
              type="button"
              aria-label={isOpen.account ? "open account menu" : "start menu"}
            >
              {isOpen.account ? (
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              )}
            </button>
          </li>
          <li className={isOpen.account ? "submenu-collapse" : "submenu-collapse submenu-close"}>
            <ul>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#unique-id`}>
                  <FormattedMessage defaultMessage="Unique ID" description="Dashboard AccountId" />
                </HashLink>
              </li>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#add-email-addresses`}>
                  <FormattedMessage defaultMessage="Email addresses" description="Emails main title" />
                </HashLink>
              </li>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#language`}>
                  <FormattedMessage defaultMessage="Language" description="Language" />
                </HashLink>
              </li>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#change-password`}>
                  <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
                </HashLink>
              </li>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#orcid`}>
                  <FormattedMessage defaultMessage="ORCID account" description="Dashboard AccountLinking" />
                </HashLink>
              </li>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#ladok`}>
                  <FormattedMessage defaultMessage="ESI information" description="Ladok account linking" />
                </HashLink>
              </li>
              <li>
                <HashLink onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#delete-account`}>
                  <FormattedMessage defaultMessage="Block and delete eduID" description="DeleteAccount" />
                </HashLink>
              </li>
            </ul>
          </li>
          <li className="logout-button-wrapper">
            <EduIDButton buttonstyle="link sm" id="logout" onClick={props.handleLogout} disabled={!props.login_url}>
              <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
              <FormattedMessage defaultMessage="Log out" description="Header logout" />
            </EduIDButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}
