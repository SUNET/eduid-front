import React, { useState } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "../Invites/InvitesParentContainer";
import DeleteGroup from "./DeleteGroupContainer";
import EditInvite from "../Invites/EditInvite";

const EditGroup = (props) => {
  const { group, toggleGroupsListOrEditGroup } = props;
  const { display_name } = props.group;
  const [parentId, setNavParent] = useState("invite");
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
      <EditGroupNav parentId={parentId} setNavParent={setNavParent} />
      <EditGroupParent
        toggleGroupsListOrEditGroup={toggleGroupsListOrEditGroup}
        parentId={parentId}
        group={group}
      />
    </div>
  );
};

const EditGroupNav = ({ parentId, setNavParent }) => {
  const navContent = [
    { invite: "Invite" },
    { membership: "Membership" },
    { delete: "Delete" },
  ];
  return (
    <nav>
      {navContent.map((item, i) => {
        let id = Object.keys(item).toString();
        let text = Object.values(item);
        return (
          <li key={i} onClick={(e) => setNavParent(e.target.id)}>
            <p className={parentId === id ? "active" : null} id={id}>
              {text}
            </p>
          </li>
        );
      })}
    </nav>
  );
};

const EditGroupParent = ({ parentId, group, toggleGroupsListOrEditGroup }) => {
  if (parentId === "invite") {
    return <InvitesParent group={group} />;
  } else if (parentId === "membership") {
    return <EditInvite />;
  } else if (parentId === "delete") {
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
