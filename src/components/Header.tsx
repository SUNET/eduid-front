import React, { Fragment } from "react";
import "../login/styles/index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { startLogout } from "actions/Header";
import { FormattedMessage } from "react-intl";

interface HeaderProps {
  email?: string;
}

const Header = (props: HeaderProps): JSX.Element => {
  const url = location.pathname;
  const signup_url = useDashboardAppSelector((state) => state.config.signup_url);
  const dashboard_url = useDashboardAppSelector((state) => state.config.dashboard_url);
  const dispatch = useDashboardAppDispatch();
  let tagline = <FormattedMessage defaultMessage="Default tagline" description="eduID is easier and safer login." />;
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

  if (url.includes("register")) {
    button = (
      <button id="login" onClick={handleLogin}>
        <FontAwesomeIcon icon={faUser} />
        <FormattedMessage defaultMessage="Log in" description="Header login" />
      </button>
    );
  } else if (url.includes("profile")) {
    tagline = (
      <Fragment>
        <FormattedMessage defaultMessage="eduID for" description="Header tagline" />
        &nbsp;
        {props.email}
      </Fragment>
    );
    button = (
      <button id="logout" onClick={handleLogout}>
        <FontAwesomeIcon icon={faUser} />
        <FormattedMessage defaultMessage="Logout" description="Header login" />
      </button>
    );
  } else if (url.includes("login")) {
    tagline = (
      <Fragment>
        <FormattedMessage defaultMessage="eduID for" description="Header tagline" />
      </Fragment>
    );
    button = (
      <button id="register" onClick={handleRegister}>
        <FormattedMessage defaultMessage="Register" description="Header register" />
      </button>
    );
  } else {
    button = <div />;
  }

  return (
    <section className="banner">
      <header>
        <a href={dashboard_url}>
          <div id="eduid-logo" />
        </a>
        {button}
      </header>
      <div className="vertical-content-margin">
        <h1 className="tagline">{tagline}</h1>
      </div>
    </section>
  );
};

export default Header;
