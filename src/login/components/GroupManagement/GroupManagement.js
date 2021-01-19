import React, { Component, Fragment } from "react";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import CreateGroup from "./Groups/CreateGroupContainer";
import GroupsParent from "./Groups/GroupsParent";

const RenderCreateGroupButton = (props) => {
  return (
    <Fragment>
      {!props.hasNoGroups && !props.openPanel ? (
        <button
          className="create-group"
          onClick={props.toggleCreateGroupOrGroupData}
        >
          create group
        </button>
      ) : null}
    </Fragment>
  );
};

const RenderCreateGroupOrGroupData = (props) => {
  if (props.loading) return <p>Loading...</p>;
  // create group when: no groups in db || toggle via buttons in local state
  if (props.hasNoGroups || props.openPanel) {
    return <CreateGroup {...props} />;
  } else {
    return <GroupsParent {...props} />;
  }
};

class GroupManagement extends Component {
  state = {
    openCreateGroup: false,
  };

  componentDidMount() {
    this.props.handleGetAllData();
  }

  toggleCreateGroupOrGroupData = () => {
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
            <RenderCreateGroupButton
              toggleCreateGroupOrGroupData={this.toggleCreateGroupOrGroupData}
              hasNoGroups={this.props.hasNoGroups}
              openPanel={this.state.openCreateGroup}
            />
          </div>
          <p>
            Create groups with other eduID users. What the groups are used for
            is up to you and the local services your univeristy provides.
          </p>
          <RenderCreateGroupOrGroupData
            {...this.props}
            toggleCreateGroupOrGroupData={this.toggleCreateGroupOrGroupData}
            openPanel={this.state.openCreateGroup}
          />
        </div>
      </article>
    );
  }
}

GroupManagement.propTypes = {};

export default InjectIntl(GroupManagement);
