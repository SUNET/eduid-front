import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../../translation/InjectIntl_HOC_factory";
import checkForCookie from "../../../../../app_utils/checkForCookie";
import DataTable from "../../../../DataTable/DataTable";

class Groups extends Component {
  render() {
    const cookieName = "show-groups";
    const cookiePattern = "";
    const showComponent = checkForCookie(cookieName, cookiePattern);

    if (showComponent) {
      console.log("these are props:", this.props);
      return (
        <div className="namesview-form-container">
          <div className="intro">
            <h4>Groups</h4>
            <p>
              Create groups with other eduID users to allow them access to
              third-party services using eduID for login.
            </p>
            {/* <DataTable data={this.props.data} /> */}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

Groups.propTypes = {};

export default InjectIntl(Groups);
