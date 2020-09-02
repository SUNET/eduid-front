import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../../translation/InjectIntl_HOC_factory";
import checkForCookie from "../../../../../app_utils/checkForCookie";
import WizardPanel from "../../../../Wizard/WizardPanel";
import DataPanel from "../../../../DataPanel/DataPanel";

// const RenderDataPanel = () => {
//   // this is just a placeholder function for the actual </DataPanel> component that will be here (problably a class component)
//   return (
//     <div className={"data-panel"}>
//       <p>This will be the DataPanel component</p>
//     </div>
//   );
// };

const RenderCreateButton = (props) => {
  // this is a placeholder button for now
  return (
    <a href="#">
      {!props.firstGroup && (
        <button
          style={{
            backgroundColor: "transparent",
            boxShadow: "0 0 0",
            textDecoration: "underline",
          }}
          className={"create-group"}
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <h4>Groups</h4>
              <RenderCreateButton firstGroup={this.state.firstGroup} />
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
            {/* <RenderDataPanel /> */}
          </div>
        </article>
      );
    }
    return <div />;
  }
}

Groups.propTypes = {};

export default InjectIntl(Groups);
