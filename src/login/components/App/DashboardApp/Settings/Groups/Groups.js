import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../../translation/InjectIntl_HOC_factory";
import WizardPanel from "../../../../Wizard/WizardPanel";
import DataPanel from "../../../../DataPanel/DataPanelContainer";

const RenderCreateButton = (props) => {
  return (
    <a href="#">
      {!props.firstGroup && (
        <button
          className="create-group"
          onClick={props.handleCreateGroup}
        >
          create group
        </button>
      )}
    </a>
  );
};

class Groups extends Component {
  state = { firstGroup: false };

  renderCreateButton = () => {
    this.setState(
      () => {
        return {
          firstGroup: false,
        };
      }
    );
  };

  componentDidMount() {
    this.props.handleGetAllData();
  }

  render() {
    return (
      <article>
        <div className="intro">
          <div className="heading">
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
}

Groups.propTypes = {};

export default InjectIntl(Groups);
