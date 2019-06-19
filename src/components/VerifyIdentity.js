import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import NinsContainer from "containers/Nins";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
import DashboardNav from "./DashboardNav";

class VerifyIdentity extends Component {
  render() {
    return (
      <div id="verify-identity">
        < DashboardNav />
        <div id="verify-identity-process">
          <div id="verify-identity-prompt">
            <h3>
              {" "}
              You're almost done, the next step is to verify your identity{" "}
            </h3>
            <p>
              Choose a suitable way to verify your identity and follow the
              instuctions to start using eduID. You can change any of your
              personal information in Settings.
            </p>
            <div id="verify-identity-prompt-button">
              <Link
                // className="button"
                id="verify-button-prompt-link"
                to={`/profile/verify-identity/`}
              >
                <button id="verify-button-prompt" type="submit">
                  {" "}
                  I want to verify my identity
                </button>
              </Link>
            </div>
          </div>
          {/* <div id="national-id">
            <Route
              exact
              path="/profile/verify-identity/"
              component={NinsContainer}
            />
            {/* <Route
              path="/profile/verify-identity"
              component={NinsContainer}
            /> 
          </div> */}
        </div>
        <h3>Why do I need eduID?</h3>
        <p>
          eduID kan användas för inloggning inom flera olika organisationer.
          eduID har utvecklats för att kunna ge alla studenter en identitet
          online utan att kräva ett svenskt personnummer.
        </p>
        <h3>How to use eduID</h3>
        <p>
          När möjlighet finns, välj "Logga in med eduID". Du kommer att bli
          skickad till eduIDs login där du anger din e-postadress och ditt
          lösenord.
        </p>
      </div>
    );
  }
}

// export default VerifyIdentity;

const mapStateToProps = (state, props) => {
  let confirmed;
  const nins = state.nins.nins.filter(nin => nin.verified);
  if (nins.length >= 1) {
    confirmed = "main.confirmed";
  } else {
    confirmed = "main.unconfirmed";
  }
  return {
    nins: state.nins.nins, // verified nin to see where to prompt user
    confirmed: confirmed // could be a boolean? to show what colour to display nin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleThingy: function(e) {
      console.log("do you need a function here?");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyIdentity);
