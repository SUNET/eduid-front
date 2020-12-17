import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import GroupsList from "./GroupsList";
import EditGroup from "./EditGroup";

class GroupParent extends Component {
  state = {
    editGroup:
      JSON.parse(window.localStorage.getItem("persistedEditGroup")) || false,
    group: JSON.parse(window.localStorage.getItem("persistedGroup")) || "",
  };

  componentDidUpdate() {
    window.localStorage.setItem("persistedEditGroup", this.state.editGroup);
    window.localStorage.setItem(
      "persistedGroup",
      JSON.stringify(this.state.group)
    );
  }

  toggleGroupsListOrEditGroup = (singleGroupData) => {
    this.setState((prevState) => {
      return {
        editGroup: !prevState.editGroup,
        group: singleGroupData,
      };
    });
  };

  render() {
    return (
      <div className="data-panel">
        {this.state.editGroup ? (
          <EditGroup
            {...this.props}
            group={this.state.group}
            toggleGroupsListOrEditGroup={this.toggleGroupsListOrEditGroup}
          />
        ) : (
          <GroupsList
            {...this.props}
            toggleGroupsListOrEditGroup={this.toggleGroupsListOrEditGroup}
          />
        )}
      </div>
    );
  }
}

GroupParent.propTypes = {};

export default InjectIntl(GroupParent);
