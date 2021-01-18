import React, { Component } from "react";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import CreateGroup from "./Groups/CreateGroupContainer";
import GroupsParent from "./Groups/GroupsParent";

const RenderCreateGroupOrGroupData = (props) => {
  if (props.loading) return <p>Loading...</p>;
  return props.hasNoGroups || props.openPanel ? (
    <CreateGroup {...props} />
  ) : (
    <GroupsParent {...props} />
  );
};

class GroupManagement extends Component {
  state = {
    openCreateGroup: false,
  };

  componentDidMount() {
    this.props.handleGetAllData();
  }

  toggleCreateGroupPanel = () => {
    this.setState((prevState) => {
      return {
        openCreateGroup: !prevState.openCreateGroup,
      };
    });
  };

  render() {
    return (
      <article>
        <div className="intro">
          <div className="heading">
            <h4>Groups</h4>
            {!this.state.openCreateGroup && (
              <button
                className="create-group"
                onClick={this.toggleCreateGroupPanel}
              >
                create group
              </button>
            )}
          </div>
          <p>
            Create groups with other eduID users. What the groups are used for
            is up to you and the local services your univeristy provides.
          </p>
          <RenderCreateGroupOrGroupData
            {...this.props}
            toggleCreateGroupPanel={this.toggleCreateGroupPanel}
            openPanel={this.state.openCreateGroup}
          />
        </div>
      </article>
    );
  }
}

GroupManagement.propTypes = {};

export default InjectIntl(GroupManagement);
