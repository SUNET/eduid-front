import React, { Fragment } from "react";
import "../login/styles/index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { startLogout } from "actions/Header";
import { FormattedMessage } from "react-intl";

interface HeaderProps {
  email?: any;
}

const Header = (props: HeaderProps): JSX.Element => {
  const url = location.pathname;
  const signup_url = useDashboardAppSelector((state) => state.config.signup_url);
  const dashboard_url = useDashboardAppSelector((state) => state.config.dashboard_url);
  const dispatch = useDashboardAppDispatch();
  let tagline = <FormattedMessage defaultMessage="Default tagline" description="eduID is easier and safer login." />;
  let button: any = "";

  function handleLogout() {
    dispatch(startLogout());
  }

  if (url.includes("register")) {
    button = (
      <a href={dashboard_url}>
        <button id="login">
          <FontAwesomeIcon icon={faUser} />
          <FormattedMessage defaultMessage="Log in" description="Header login" />
          {/* {props.translate("header.signin")} */}
        </button>
      </a>
    );
  } else if (url.includes("profile")) {
    tagline = (
      <Fragment>
        <FormattedMessage defaultMessage="eduID for" description="Header tagline" />
        {/* {props.translate("dashboard.tagline")}  */}
        {props.email}
      </Fragment>
    );
    button = (
      <div id="eduid-button">
        <button id="logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faUser} />
          <FormattedMessage defaultMessage="Logout" description="Header login" />
          {/* {props.translate("header.logout")} */}
        </button>
      </div>
    );
  } else if (url.includes("login")) {
    tagline = (
      <Fragment>
        <FormattedMessage defaultMessage="eduID for" description="Header tagline" />
        {/* {props.translate("dashboard.tagline")} */}
      </Fragment>
    );
    button = <a href={signup_url}>REGISTER</a>;
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
