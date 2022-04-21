import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";

class CodeVerified extends Component {
  render() {
    return (
      <form key="2" method="GET" action={this.props.dashboard_url} className="vertical-content-margin">
        <div key="0" id="content" className="content">
          <div>
            <h1 className="register-header">{this.props.translate("finish.registration-complete")}</h1>
            <p className="preamble">{this.props.translate("finish.registration-details")}</p>
            <div id="email-display">
              <fieldset>
                <label>Email</label>
                <div id="user-email" className="register-header display-data">
                  {this.props.email}
                </div>
              </fieldset>
              <fieldset>
                <label>Password</label>
                <div className="register-header registered-email display-data">
                  <mark id="user-password" className="force-select-all">
                    {this.props.password}
                  </mark>
                </div>
              </fieldset>
            </div>
            <div className="buttons">
              <EduIDButton id="gotit-button" buttonstyle="primary" type="submit">
                {this.props.translate("finish.got-it")}
              </EduIDButton>
            </div>
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
  translate: PropTypes.func,
};

export default CodeVerified;
