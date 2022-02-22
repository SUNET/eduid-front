import React, { Fragment } from "react";
import "../login/styles/index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  translate: any;
  button: any;
  dashboard_url: string;
  email: string;
  handleLogout: any;
}

const Header = (props: HeaderProps): JSX.Element => {
  const url = location.pathname;
  let tagline = props.translate("banner.tagline");
  let button: any = "";

  if (url.includes("register")) {
    button = (
      <a href={props.dashboard_url}>
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
        <button id="logout" onClick={props.handleLogout}>
          <FontAwesomeIcon icon={faUser} />
          {props.translate("header.logout")}
        </button>
      </div>
    );
  } else {
    button = <div />;
  }

  return (
    <section className="banner">
      <header>
        <a href={props.dashboard_url}>
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
