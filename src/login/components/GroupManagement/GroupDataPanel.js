import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import GroupList from "./GroupList";
import EditMode from "./EditMode/EditMode";

class GroupDataPanel extends Component {
  state = { editMode: false, group: "" };

  toggleViewOrEditMode = (singleGroupData) => {
    this.setState((prevState) => {
      return {
        editMode: !prevState.editMode,
        group: singleGroupData,
      };
    });
  };

  render() {
    return (
      <div className="data-panel">
        {this.state.editMode ? (
          <EditMode
            {...this.props}
            group={this.state.group}
            toggleViewOrEditMode={this.toggleViewOrEditMode}
          />
        ) : (
          <GroupList
            {...this.props}
            toggleViewOrEditMode={this.toggleViewOrEditMode}
          />
        )}
      </div>
    );
  }
}

GroupDataPanel.propTypes = {};

export default InjectIntl(GroupDataPanel);
