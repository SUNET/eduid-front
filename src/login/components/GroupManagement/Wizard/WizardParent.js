import React, { Component, Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const RenderHeading = (props) => {
  return <p>Create {props.hasNoGroups ? "your first" : "a new"} group.</p>;
};

class WizardParent extends Component {
  state = { firstInvite: true };
  render() {
    return (
      <Fragment>
        {this.props.openPanel && (
          <div className="wizard">
            <div className="title">
              <RenderHeading hasNoGroups={this.props.hasNoGroups} />
              <button onClick={() => this.props.toggleCreateGroupPanel()}>
                X
              </button>
            </div>
            <p>
              As the creator of a group you will be an admin, which allows you
              to edit the group and send out invites.
            </p>
            <div className="group-name">
              <label>Group name</label>
              <input />
            </div>
            <button
              className="create-group"
              onClick={() => {
                console.log("wizard is not fully functional yet");
              }}
            >
              CREATE GROUP
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

WizardParent.propTypes = {};

export default InjectIntl(WizardParent);
