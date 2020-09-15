import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../../translation/InjectIntl_HOC_factory";
import checkForCookie from "../../../../../app_utils/checkForCookie";
import WizardPanel from "../../../../Wizard/WizardPanel";
import DataPanel from "../../../../DataPanel/DataPanelContainer";

const RenderCreateButton = (props) => {
  // this is a placeholder button for now
  console.log("these are props in RenderCreateButton:", props);
  return (
    <a href="#">
      {!props.firstGroup && (
        <button
          style={{
            backgroundColor: "transparent",
            boxShadow: "0 0 0",
            textDecoration: "underline",
            margin: "0",
          }}
          className={"create-group"}
          onClick={props.handleCreateGroup}
        >
          create group
        </button>
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

  // will start as true and permanently be set to false when wizard is completed
  state = { firstGroup: true };

  renderCreateButton = () => {
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
  };

  render() {
    const cookieName = "show-groups";
    const cookiePattern = "";
    const showComponent = checkForCookie(cookieName, cookiePattern);

    if (showComponent) {
      return (
        <article
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="intro">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <h4>Groups</h4>
              <RenderCreateButton
                handleCreateGroup={this.props.handleCreateGroup}
                firstGroup={this.state.firstGroup}
              />
            </div>
            <p>
              Create groups with other eduID users. What the groups are used for
              is up to you and the local services your univeristy provides.
            </p>
            <WizardPanel
              renderCreateButton={this.renderCreateButton}
              firstGroup={this.state.firstGroup}
            />
            <DataPanel />
          </div>
        </article>
      );
    }
    return <div />;
  }
}

Groups.propTypes = {};

export default InjectIntl(Groups);
