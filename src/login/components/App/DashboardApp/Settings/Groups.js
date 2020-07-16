import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";
import CheckForCookie from "components/CookieChecker";

class Groups extends Component {
  render() {
    return (
      <CheckForCookie cookieName="show-groups">
        <div className="namesview-form-container">
          <div className="intro">
            <h4>Groups</h4>
            <p>
              Create groups with other eduID users to allow them access to
              third-party services using eduID for login.
            </p>
          </div>
        </div>
      </CheckForCookie>
    );
  }
}

Groups.propTypes = {};

export default withRouter(InjectIntl(Groups));
