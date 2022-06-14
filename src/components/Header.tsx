import React, { Fragment } from "react";
import "../login/styles/index.scss";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { startLogout } from "actions/Header";
import { FormattedMessage } from "react-intl";
import EduIDButton from "components/EduIDButton";

interface HeaderProps {
  email?: string;
  showLogin?: boolean;
  showLogout?: boolean;
  showRegister?: boolean;
}

const Header = (props: HeaderProps): JSX.Element => {
  const signup_url = useDashboardAppSelector((state) => state.config.signup_url);
  const dashboard_url = useDashboardAppSelector((state) => state.config.dashboard_url);
  const eduid_site_url = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const dispatch = useDashboardAppDispatch();
  let userName;
  let button;

  function handleLogout() {
    dispatch(startLogout());
  }

  function handleRegister() {
    if (signup_url) {
      document.location.href = signup_url;
    }
  }

  function handleLogin() {
    if (dashboard_url) {
      document.location.href = dashboard_url;
    }
  }

  if (props.showLogin) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="login" onClick={handleLogin}>
        <FormattedMessage defaultMessage="Log in" description="Header login" />
      </EduIDButton>
    );
  } else if (props.showLogout) {
    userName = <div className="header-user">{props.email}</div>;
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="logout" onClick={handleLogout}>
        <FormattedMessage defaultMessage="Log out" description="Header logout" />
      </EduIDButton>
    );
  } else if (props.showRegister) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="register" onClick={handleRegister}>
        <FormattedMessage defaultMessage="Register" description="Header register" />
      </EduIDButton>
    );
  } else {
    button = <div />;
  }

  return (
    <section className="banner">
      <header>
        <a href={dashboard_url ? dashboard_url : eduid_site_url}>
          <div id="eduid-logo" className="eduid-logo" />
        </a>
        {button}
        {userName}
      </header>
    </section>
  );
};

export default Header;
