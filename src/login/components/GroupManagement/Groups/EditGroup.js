import React, { useState, useEffect } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "../Invites/InvitesParentContainer";
import DeleteGroup from "./DeleteGroupContainer";
import EditInvite from "../Invites/EditInvite";

const EditGroup = (props) => {
  const {
    group,
    handleAddNavIdToStore,
    savedNavId,
    toggleGroupsListOrEditGroup,
  } = props;
  const { display_name } = props.group;
  const [navId, setNavId] = useState(savedNavId);
  useEffect(() => {
    handleAddNavIdToStore(navId);
  }, [navId]);
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit {display_name}</p>
        <button
          className="save-button"
          onClick={() => {
            toggleGroupsListOrEditGroup(group);
          }}
        >
          save
        </button>
      </div>
      <EditGroupNav navId={navId} setNavId={setNavId} />
      <EditGroupNavParent
        toggleGroupsListOrEditGroup={toggleGroupsListOrEditGroup}
        navId={navId}
        group={group}
      />
    </div>
  );
};

const EditGroupNav = ({ navId, setNavId }) => {
  const navContent = [
    { "create-invite": "Invite" },
    { "edit-invite": "Membership" },
    { "delete-group": "Delete" },
  ];
  return (
    <nav>
      {navContent.map((item, i) => {
        let id = Object.keys(item).toString();
        let text = Object.values(item);
        return (
          <li key={i} onClick={(e) => setNavId(e.target.id)}>
            <p className={navId === id ? "active" : null} id={id}>
              {text}
            </p>
          </li>
        );
      })}
    </nav>
  );
};

const EditGroupNavParent = ({ navId, group, toggleGroupsListOrEditGroup }) => {
  if (navId === "create-invite") {
    return <InvitesParent group={group} />;
  } else if (navId === "edit-invite") {
    return <EditInvite />;
  } else if (navId === "delete-group") {
    return (
      <DeleteGroup
        toggleGroupsListOrEditGroup={toggleGroupsListOrEditGroup}
        groupId={group.identifier}
      />
    );
  }
};

// EditGroup.propTypes = {};

export default InjectIntl(EditGroup);
