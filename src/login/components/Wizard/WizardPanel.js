import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const RenderFirstGroupWizard = (props) => {
  return (
    <Fragment>
      {props.firstGroup && (
        <div
          className="wizard"
        >
          <div className="title" >
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
              className={"create-group"}
              onClick={() => {
                props.renderCreateButton();
              }}
            >
              CREATE GROUP
            </button>
        </div>
      )}
    </Fragment>
  );
};

class WizardPanel extends Component {
  state = { firstInvite: true };
  render() {
    return <RenderFirstGroupWizard {...this.props} />;
  }
}

WizardPanel.propTypes = {};

export default InjectIntl(WizardPanel);
