import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class VerifyIdentity extends Component {
  render() {
    return (
      <div id="welcome">
        <div id="verify-identity-prompt">
          <h3>
            {" "}
            You're almost done, the next step is to verify your identity{" "}
          </h3>
          <p>
            {" "}
            Choose a suitable way to verify your identity and follow the
            instuctions to start using eduID. You can change any of your
            personal information in Settings.
          </p>
          <div id="verify-identity-button">
            <button
              id="verify-button"
              type="submit"
              // onClick={() => this.showVerifyIdentity()}
            >
              {" "}
              I want to verify my identity
            </button>
            {/* {this.props.l10n(tab.label)} */}
          </div>
          <h3>Why do I need eduID?</h3>
          <p>
            eduID kan användas för inloggning inom flera olika
            organisationer. eduID har utvecklats för att kunna ge alla
            studenter en identitet online utan att kräva ett svenskt
            personnummer.
          </p>
          <h3>How to use eduID</h3>
          <p>
            När möjlighet finns, välj "Logga in med eduID". Du kommer att
            bli skickad till eduIDs login där du anger din e-postadress och
            ditt lösenord.
          </p>
        </div>
      </div>
    );
  }
}

export default VerifyIdentity;
