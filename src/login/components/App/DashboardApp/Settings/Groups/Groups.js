import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../../translation/InjectIntl_HOC_factory";
import checkForCookie from "../../../../../app_utils/checkForCookie";

const RenderWizard = (props) => {
  return (
    <div className={"wizard"}>
      {props.show && <p>Create you first group wizard</p>}
    </div>
  );
};

const RenderCreateButton = (props) => {
  return (
    <a href="#">
      {!props.show && (
        <button className={"create-group"}>Create button</button>
      )}
    </a>
  );
};


class Groups extends Component {
  // this component should:
  // 1. take in text to fill .intro h4 and .intro p (hardcoded at the moment)
  // 2. be able to handle logic of create group button:
  // - if wizard: hide button
  // - if no wizard: show button

  constructor(props) {
    super(props);
    // will start as true and permanently be set to false when wizard is completed
    this.state = { wizardCreateGroup: true};
  }

  render() {
    const cookieName = "show-groups";
    const cookiePattern = "";
    const showComponent = checkForCookie(cookieName, cookiePattern);
 
    if (showComponent) {
      return (
        <article>
          <div className="intro">
            <div>
              <h4>Groups</h4>
              <RenderCreateButton show={this.state.wizardCreateGroup} />
            </div>
            <p>
              Create groups with other eduID users to allow them access to
              third-party services using eduID for login.
            </p>
            <div>
              <p>This will be the DataPanel component</p>
              <RenderWizard show={this.state.wizardCreateGroup} />
            </div>
          </div>
        </article>
      );
    }
    return <div />;
  }
}

Groups.propTypes = {};

export default InjectIntl(Groups);
