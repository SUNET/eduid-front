import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import CreateGroup from "./Groups/CreateGroup";
import GroupsParent from "./Groups/GroupsParent";
import AllInvitesList from "./Invites/AllInvitesList";
import * as createGroupActions from "../../redux/actions/createGroupActions";

const RenderCreateGroupButton = ({ createGroup }) => {
  const dispatch = useDispatch();
  return (
    <>
      {!createGroup && (
        <button
          className="create-group"
          onClick={() => dispatch(createGroupActions.openCreateGroup())}
        >
          create group
        </button>
      )}
    </>
  );
};

const RenderInvitesToMe = (props) => {
  const invites = useSelector((state) => state.invites.invitesToMe);
  const hasInvites = invites.length > 0 ? true : false;
  return (
    <Fragment>{hasInvites ? <AllInvitesList {...props} /> : null}</Fragment>
  );
};

const RenderCreateGroupOrGroupData = (props) => {
  const groupsData = useSelector((state) => state.groups.data);
  const loading = useSelector((state) => state.groups.loading);
  const createGroup = useSelector((state) => state.groups.createGroup);
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : createGroup || groupsData.length === 0 ? (
        <CreateGroup {...props} />
      ) : groupsData.length ? (
        <GroupsParent groupsData={groupsData} {...props} />
      ) : null}
    </>
  );
};

function GroupManagement(props) {
  const groupsData = useSelector((state) => state.groups.data);
  const createGroup = useSelector((state) => state.groups.createGroup);
  const [hasNoGroups, setHasNoGroups] = useState(false);

  useEffect(() => {
    if (groupsData !== undefined) {
      if (groupsData.length === 0) {
        setHasNoGroups(true);
      } else setHasNoGroups(false);
    }
  }, [hasNoGroups, groupsData]);

  return (
    <article>
      <div className="intro">
        <div className="heading">
          <h4>Groups</h4>
          <RenderCreateGroupButton
            createGroup={createGroup}
            hasNoGroups={hasNoGroups}
            {...props}
          />
        </div>
        <p>
          Create groups with other eduID users. What the groups are used for is
          up to you and the local services your university provides.
        </p>
        <div className="data-panel">
          <RenderInvitesToMe {...props} />
          <RenderCreateGroupOrGroupData hasNoGroups={hasNoGroups} {...props} />
        </div>
      </div>
    </article>
  );
}

// GroupManagement.propTypes = {};

export default InjectIntl(GroupManagement);
