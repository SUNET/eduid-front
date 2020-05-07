import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";

class CodeVerified extends Component {
  render() {
    return (
      <form key="2" method="GET" action={this.props.dashboard_url} className="vertical-content-margin">
        <div key="0" id="register-container">
          <div>
            <h3 className="register-header">
              {this.props.translate("finish.registration-complete")}
            </h3>
            <p className="lead">
              {this.props.translate("finish.registration-details")}
            </p>
            <div id="email-display">
              <label>Email</label>
              <h3 id="user-email" className="register-header">
                {this.props.email}
              </h3>
              <label>Password</label>
              <h3 className="register-header registered-email">
                <mark id="user-password" className="force-select-all">
                  {this.props.password}
                </mark>
              </h3>
            </div>
            <EduIDButton
              id="gotit-button"
              className="settings-button"
              type="submit"
            >
              {this.props.translate("finish.got-it")}
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
  translate: PropTypes.func
};

export default CodeVerified;
