import React, { Component, Fragment } from "react";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import CreateGroup from "./Groups/CreateGroupContainer";
import GroupsParent from "./Groups/GroupsParent";

const RenderCreateGroupButton = (props) => {
  return (
    <Fragment>
      {!props.createGroup && (
        <button className="create-group" onClick={props.handleOpenCreateGroup}>
          create group
        </button>
      )}
    </Fragment>
  );
};

const RenderCreateGroupOrGroupData = (props) => {
  if (props.loading) return <p>Loading...</p>;
  if (props.createGroup || props.hasNoGroups) return <CreateGroup {...props} />;
  if (!props.hasNoGroups) return <GroupsParent {...props} />;
};

class GroupManagement extends Component {
  componentDidMount() {
    this.props.handleGetAllData();
  }

  render() {
    return (
      <article>
        <div className="intro">
          <div className="heading">
            <h4>Groups</h4>
            <RenderCreateGroupButton {...this.props} />
          </div>
          <p>
            Create groups with other eduID users. What the groups are used for
            is up to you and the local services your university provides.
          </p>
          <RenderCreateGroupOrGroupData {...this.props} />
        </div>
      </article>
    );
  }
}

GroupManagement.propTypes = {};

export default InjectIntl(GroupManagement);
