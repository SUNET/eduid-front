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

      // // just mock handling data here to render something from the api
      // let mockData = [];
      // let mockArray = Object.keys(this.props.data);
      // mockData = mockArray.map((thing, i) => {
      //   console.log("these are thing:", thing);
      //   return <p key={i}>{thing}</p>;
      // });

      
      return (
        <article>
          <div className="intro">
            <h4>Groups</h4>
            <p>
              Create groups with other eduID users to allow them access to
              third-party services using eduID for login.
            </p>
            {/* {mockData} */}
            <div>This will be the DataPanel component</div>
            {/* <DataTable data={this.props.data} /> */}
          </div>
        </article>
      );
    }
    return <div />;
  }
}

Groups.propTypes = {};

export default InjectIntl(Groups);
