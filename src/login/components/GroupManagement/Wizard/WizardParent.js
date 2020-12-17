import React, { Component, Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const RenderCreateGroupWizard = (props) => {
  return (
    <Fragment>
      {props.noGroups && (
        <div className="wizard">
          <div className="title">
            <p>Create your first group.</p>
            <button>X</button>
          </div>
          <p>
            As the creator of a group you will be an admin, which allows you to
            edit the group and send out invites.
          </p>
          <div className="group-name">
            <label>Group name</label>
            <input />
          </div>
            <button
              className="create-group"
              onClick={() => {
                console.log("wizard is not fully functional yet")
              }}
            >
              CREATE GROUP
            </button>
        </div>
      )}
    </Fragment>
  );
};

class WizardParent extends Component {
  state = { firstInvite: true };
  render() {
    return <RenderCreateGroupWizard {...this.props} />;
  }
}

WizardParent.propTypes = {};

export default InjectIntl(WizardParent);
