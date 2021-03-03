import React, { Component } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import GroupsList from "./GroupsList";
import EditGroup from "./EditGroupContainer";

const LOCAL_STORAGE_PERSISTED_EDIT_GROUP = "persistedEditGroup";
const LOCAL_STORAGE_PERSISTED_GROUP = "persistedGroup";

class GroupParent extends Component {
  state = {
    editGroup:
      JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_PERSISTED_EDIT_GROUP)
      ) || false,
    group:
      JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_PERSISTED_GROUP)) ||
      "",
  };

  componentDidUpdate() {
    window.localStorage.setItem(
      LOCAL_STORAGE_PERSISTED_EDIT_GROUP,
      this.state.editGroup
    );
    window.localStorage.setItem(
      LOCAL_STORAGE_PERSISTED_GROUP,
      JSON.stringify(this.state.group)
    );
  }

  toggleGroupsListOrEditGroup = (groupData) => {
      this.setState((prevState) => {
        return {
          editGroup: !prevState.editGroup,
          group: groupData,
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

// GroupParent.propTypes = {};

export default InjectIntl(GroupParent);
