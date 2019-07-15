import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EduIDButton from "components/EduIDButton";

import "style/CodeVerified.scss";

class CodeVerified extends Component {
  render() {
    return (
      <form key="2" method="GET" action={this.props.dashboard_url}>
        <div key="0" id="register-container">
          {/* <div className="col-lg-1" /> */}
          <div>
            {/* <h1>{this.props.l10n("main.welcome")}</h1> */}
            <h3 className="register-header">
              {this.props.l10n("finish.registration-complete")}
            </h3>
            <p className="lead">
              {this.props.l10n("finish.registration-details")}
            </p>
            {/* {this.props.l10n("finish.registration-details")({
              email: this.props.email
            })} */}

            <div id="email-display">
              <label>Email</label>
              <h3 className="register-header">
                {this.props.email} njons17@test.com
              </h3>
              <label>Password</label>
              <h3 className="register-header registered-email">
                {/* {this.props.email} */}
                <mark className="force-select-all">
                  {this.props.password} tyu yui 89h{" "}
                </mark>
              </h3>
            </div>
            {/* <p className="lead">{this.props.l10n("finish.write-password")}</p>
            <pre className="pre-big text-center force-select-all">
              <mark>{this.props.password}</mark>
            </pre> */}
            <EduIDButton
              id="gotit-button"
              className="settings-button"
              type="submit"
            >
              {this.props.l10n("finish.got-it")}
            </EduIDButton>
          </div>
        </div>
      </form>
    );
  }
}

CodeVerified.propTypes = {
  dashboard_url: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  l10n: PropTypes.func
};

export default CodeVerified;
