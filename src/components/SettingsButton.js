import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class SettingsButton extends Component {
  render() {
    const url = window.location.href;
    let linkTo = "";
    let text = "";

    if (url.includes("settings")) {
      console.log("this is props in settings button:", this.props.nins);
      if (this.props.confirmed) {
        linkTo = `/profile/verify-identity`;
      } else {
        linkTo = `/profile/`;
      }
      text = "Back";
    } else {
      linkTo = `/profile/settings/`;
      text = "Settings";
    }

    return (
      <Link className="button" id="submit-button-link" to={linkTo}>
        <button id="settings-button" type="submit">
          {text}
        </button>
      </Link>
    );
  }
}

export default SettingsButton;
