import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const RenderFirstGroupWizard = (props) => {
  return (
    <Fragment>
      {props.firstGroup && (
        <div
          className="create-group-wizard"
          style={{
            backgroundColor: "white",
            padding: "1rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontWeight: "700" }}>Create your first group.</p>
            <p>X</p>
          </div>
          <p>
            As the creator of a group you will be an admin, which allows you to
            edit the group and send out invites.
          </p>
          <div>
            <label>Group name</label>
            <input style={{ backgroundColor: "#F4F4F4" }} />
          </div>
          <a
            href="#"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                margin: "1rem 0",
              }}
              className={"create-group"}
              onClick={() => {
                props.renderCreateButton();
              }}
            >
              CREATE GROUP
            </button>
          </a>
        </div>
      )}
    </Fragment>
  );
};

class WizardPanel extends Component {
  // this component should:
  // 1. Be able to handle logic of what wizard to render when
  // - at start:
  //     state = {firstGroup: true}
  //     -> render wizard
  // - when clicking CREATE GROUP button in wizard:
  //     state = {firstGroup: false}
  //     -> permanently remove wizard
  //  - when first invite:
  //     state = {firstInvite: true}
  //     -> render wizard
  //  - when clicking ACCEPT or IGNORE button in wizard:
  //     state = {firstInvite: false}
  //     -> render invite data in a table
  // 2. Be able to inform <Groups/> about:
  //     state = {firstGroup: false}
  //     -> keeping this as local state if possible

  constructor(props) {
    super(props);
    // will start as true and permanently be set to false when wizard is completed
    this.state = { firstInvite: true };
  }

  render() {
    return <RenderFirstGroupWizard {...this.props} />;
  }
}

WizardPanel.propTypes = {};

export default InjectIntl(WizardPanel);
