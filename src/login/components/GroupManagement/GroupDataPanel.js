import React, { Component } from "react";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import GroupList from "./GroupList";
import EditMode from "./EditMode/EditMode";

class GroupDataPanel extends Component {
  state = {
    editMode:
      JSON.parse(window.localStorage.getItem("persistedEditMode")) || false,
    group: JSON.parse(window.localStorage.getItem("persistedGroup")) || "",
  };

  componentDidUpdate() {
    window.localStorage.setItem("persistedEditMode", this.state.editMode);
    window.localStorage.setItem(
      "persistedGroup",
      JSON.stringify(this.state.group)
    );
  }

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
