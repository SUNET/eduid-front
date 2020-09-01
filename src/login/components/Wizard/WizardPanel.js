import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

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

  render() {
    return (
      <div className="create-group-wizard">
        <p>Create your first group</p>
        <a href="#">
          <button
            className={"create-group"}
            onClick={() => {
              this.props.renderCreateButton();
            }}
          >
            tell parent state.firstGroup is false
          </button>
        </a>
      </div>
    );
  }
}

WizardPanel.propTypes = {};

export default InjectIntl(WizardPanel);
