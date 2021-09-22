import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import CreateGroup from "./Groups/CreateGroupContainer";
import GroupsParent from "./Groups/GroupsParent";
import AllInvitesList from "./Invites/AllInvitesList";

const RenderCreateGroupButton = ({ createGroup, handleOpenCreateGroup }) => (
  <Fragment>
    {!createGroup && (
      <button className="create-group" onClick={handleOpenCreateGroup}>
        create group
      </button>
    )}
  </Fragment>
);

const RenderInvitesToMe = (props) => {
  const invites = useSelector((state) => state.invites.invitesToMe);
  const hasInvites = invites.length > 0 ? true : false;
  return (
    <Fragment>{hasInvites ? <AllInvitesList {...props} /> : null}</Fragment>
  );
};

const RenderCreateGroupOrGroupData = (props) => {
  if (props.loading) return <p>Loading...</p>;
  if (props.createGroup || props.hasNoGroups) return <CreateGroup {...props} />;
  if (!props.hasNoGroups) return <GroupsParent {...props} />;
};

const GroupManagement = (props) => (
  <article>
    <div className="intro">
      <div className="heading">
        <h4>Groups</h4>
        <RenderCreateGroupButton {...props} />
      </div>
      <p>
        Create groups with other eduID users. What the groups are used for is up
        to you and the local services your university provides.
      </p>
      <RenderInvitesToMe {...props} />
      <RenderCreateGroupOrGroupData {...props} />
    </div>
  </article>
);

// GroupManagement.propTypes = {};

export default InjectIntl(GroupManagement);
