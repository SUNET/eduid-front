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
import { Link, NavLink } from "react-router";

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

function useCloseMenuClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
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

export function HeaderNav(props: HeaderNavProps): React.JSX.Element {
  const emails = useAppSelector((state) => state.emails.emails);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<{ [key in ButtonKey]: boolean }>({
    start: false,
    identity: false,
    security: false,
    account: false,
  });
  const wrapperRef = useRef<HTMLElement | null>(null);

  const userName = emails.filter((mail) => mail.primary)[0]?.email;

  useEffect(() => {
    const handleResize = () => {
      setIsOpen((prev) => {
        const anyOpen = Object.values(prev).some((val) => val === true);
        if (!anyOpen) return prev;
        return Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])) as Record<ButtonKey, boolean>;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleOpen = (button: ButtonKey) => {
    setIsOpen((prevState) => {
      if (window.innerWidth > 1200) {
        return prevState;
      }
      const isCurrentlyOpen = prevState[button];
      const newState = Object.keys(prevState).reduce((buttonState, key) => {
        buttonState[key as ButtonKey] = false;
        return buttonState;
      }, {} as { [key in ButtonKey]: boolean });
      if (!isCurrentlyOpen) {
        newState[button] = true;
      }
      return newState;
    });
  };

  useCloseMenuClickOutside(wrapperRef, () => setOpenMenu(false));
  return (
    <nav className="header-nav" ref={wrapperRef}>
      <button
        className="header-user"
        aria-expanded={openMenu}
        type="button"
        onClick={() => setOpenMenu(!openMenu)}
        data-name={userName}
      >
        <span className="user-name">{userName}</span>
        {openMenu ? <FontAwesomeIcon icon={faXmark as IconProp} /> : <FontAwesomeIcon icon={faBars as IconProp} />}
      </button>
      <div className={openMenu ? "nav-menu active" : "nav-menu"}>
        <ul>
          <li>
            <div className="flex-between">
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
            </div>
            <ul className={isOpen.start ? "submenu-collapse" : "submenu-close"}>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${START_PATH}#status-overview`}>
                  <FormattedMessage defaultMessage="eduID status overview" description="status overview title" />
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="flex-between">
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
            </div>
            <ul className={isOpen.identity ? "submenu-collapse" : "submenu-close"}>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${IDENTITY_PATH}#verify-identity`}>
                  <FormattedMessage defaultMessage="Verify Identity" description="Identity sub menu" />
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setOpenMenu(false)}
                  to={`${IDENTITY_PATH}#personal-data`}
                  aria-label="go to manage your security key section"
                >
                  <FormattedMessage description="Names & Display Name" defaultMessage={`Names & Display Name`} />
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="flex-between">
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
            </div>
            <ul className={isOpen.security ? "submenu-collapse" : "submenu-close"}>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${SECURITY_PATH}#add-two-factor`}>
                  <FormattedMessage defaultMessage="Two-factor Authentication (2FA)" description="security key title" />
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${SECURITY_PATH}#manage-security-keys`}>
                  <FormattedMessage defaultMessage="Manage your security keys" description="manage your tokens" />
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div className="flex-between">
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
            </div>
            <ul className={isOpen.account ? "submenu-collapse" : "submenu-close"}>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#unique-id`}>
                  <FormattedMessage defaultMessage="Unique ID" description="Dashboard AccountId" />
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#add-email-addresses`}>
                  <FormattedMessage defaultMessage="Email addresses" description="Emails main title" />
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#language`}>
                  <FormattedMessage defaultMessage="Language" description="Language" />
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#change-password`}>
                  <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#orcid`}>
                  <FormattedMessage defaultMessage="ORCID account" description="Dashboard AccountLinking" />
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#ladok`}>
                  <FormattedMessage defaultMessage="ESI information" description="Ladok account linking" />
                </Link>
              </li>
              <li>
                <Link onClick={() => setOpenMenu(false)} to={`${ACCOUNT_PATH}#delete-account`}>
                  <FormattedMessage defaultMessage="Block and delete eduID" description="DeleteAccount" />
                </Link>
              </li>
            </ul>
          </li>
        </ul>
        <span className="desktop-username">{userName}</span>
        <div className="logout-button-wrapper">
          <EduIDButton buttonstyle="link sm " id="logout" onClick={props.handleLogout} disabled={!props.login_url}>
            <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
            <FormattedMessage defaultMessage="Log out" description="Header logout" />
          </EduIDButton>
        </div>
      </div>
    </nav>
  );
}
