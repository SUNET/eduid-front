import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";
import checkForCookie from "../../../../app_utils/checkForCookie";

class Groups extends Component {
  render() {
    const cookieName = "show-groups";
    const cookiePattern = "";
    const showComponent = checkForCookie(cookieName);

    if (showComponent) {
      return (
        // <CheckForCookie cookieName="show-groups">
        <div className="namesview-form-container">
          <div className="intro">
            <h4>Groups</h4>
            <p>
              Create groups with other eduID users to allow them access to
              third-party services using eduID for login.
            </p>
          </div>
        </div>
        // </CheckForCookie>
      );
    }
    return <div />;
  }
}

Groups.propTypes = {};

export default withRouter(InjectIntl(Groups));
