import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class SettingsButton extends Component {
  render() {
    return (
      <Link
        className="button"
        id="submit-button-link"
        to={`/profile/settings/`}
      >
        <button id="settings-button" type="submit">
          Settings
        </button>
      </Link>
    );
  }
}

export default SettingsButton;
