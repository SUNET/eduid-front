import React, { Fragment } from "react";
import "../login/styles/index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { startLogout } from "actions/Header";

interface HeaderProps {
  translate?: any;
  email?: any;
}

const Header = (props: HeaderProps): JSX.Element => {
  const url = location.pathname;
  const signup_url = useDashboardAppSelector((state) => state.config.signup_url);
  const dashboard_url = useDashboardAppSelector((state) => state.config.dashboard_url);
  const dispatch = useDashboardAppDispatch();
  let tagline = props.translate("banner.tagline");
  let button: any = "";

  function handleLogout() {
    dispatch(startLogout());
  }

  if (url.includes("register")) {
    button = (
      <a href={dashboard_url}>
        <button id="login">
          <FontAwesomeIcon icon={faUser} />
          {props.translate("header.signin")}
        </button>
      </a>
    );
  } else if (url.includes("profile")) {
    tagline = (
      <Fragment>
        {props.translate("dashboard.tagline")} {props.email}
      </Fragment>
    );
    button = (
      <div id="eduid-button">
        <button id="logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faUser} />
          {props.translate("header.logout")}
        </button>
      </div>
    );
  } else if (url.includes("login")) {
    tagline = <Fragment>{props.translate("dashboard.tagline")}</Fragment>;
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
