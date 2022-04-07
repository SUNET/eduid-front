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
  let tagline = <FormattedMessage defaultMessage="eduID is easier and safer login." description="Default tagline" />;
  let button;

  function handleLogout() {
    dispatch(startLogout());
  }

  function handleRegister() {
    document.location.href = signup_url;
  }

  function handleLogin() {
    document.location.href = dashboard_url;
  }

  if (props.showLogin) {
    button = (
      <EduIDButton buttonStyle="secondary" size="sm" id="login" onClick={handleLogin}>
        <FormattedMessage defaultMessage="Log in" description="Header login" />
      </EduIDButton>
    );
  } else if (props.showLogout) {
    tagline = (
      <Fragment>
        <FormattedMessage defaultMessage="eduID for" description="Header tagline" />
        &nbsp;
        {props.email}
      </Fragment>
    );
    button = (
      <EduIDButton buttonStyle="secondary" size="sm" id="logout" onClick={handleLogout}>
        <FormattedMessage defaultMessage="Log out" description="Header logout" />
      </EduIDButton>
    );
  } else if (props.showRegister) {
    button = (
      <EduIDButton buttonStyle="secondary" size="sm" id="register" onClick={handleRegister}>
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
        <div className="tagline-wrapper">
          <div className="horizontal-content-margin">{tagline}</div>
        </div>
        {button}
      </header>
      {/* <div className="vertical-content-margin">
        <div className="tagline">{tagline}</div>
      </div> */}
    </section>
  );
};

export default Header;
