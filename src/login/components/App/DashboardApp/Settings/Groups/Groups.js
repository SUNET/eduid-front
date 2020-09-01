import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../../translation/InjectIntl_HOC_factory";
import checkForCookie from "../../../../../app_utils/checkForCookie";
import WizardPanel from "../../../../Wizard/WizardPanel";

const RenderDataPanel = () => {
  // this is just a placeholder function for the actual </DataPanel> component that will be here (problably a class component)
  return (
    <div className={"data-panel"}>
      <p>This will be the DataPanel component</p>
    </div>
  );
};

const RenderCreateButton = (props) => {
  // this is a placeholder button for now
  return (
    <a href="#">
      {!props.firstGroup && (
        <button className={"create-group"}>create group</button>
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
    this.state = { firstGroup: true };
    this.renderCreateButton = this.renderCreateButton.bind(this);
  }

  renderCreateButton() {
    console.log("you're setting state.firstGroup to false ");
    this.setState(
      () => {
        return {
          firstGroup: false,
        };
      },
      () => {
        console.log(
          "this is the updated state.firstGroup:",
          this.state.firstGroup
        );
      }
    );
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
              <RenderCreateButton firstGroup={this.state.firstGroup} />
            </div>
            <p>
              Create groups with other eduID users to allow them access to
              third-party services using eduID for login.
            </p>
            <RenderDataPanel />
            <WizardPanel
              renderCreateButton={this.renderCreateButton}
              firstGroup={this.state.firstGroup}
            />
          </div>
        </article>
      );
    }
    return <div />;
  }
}

Groups.propTypes = {};

export default InjectIntl(Groups);
