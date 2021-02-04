import React, { useState } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "../Invites/InvitesParentContainer";
import DeleteGroup from "./DeleteGroup";
import EditInvite from "../Invites/EditInvite";

const EditGroup = (props) => {
  const { group } = props;
  const { display_name } = props.group;
  const [parentId, setNavParent] = useState("invites");
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit {display_name}</p>
        <button
          className="save-button"
          onClick={() => {
            props.toggleGroupsListOrEditGroup(group);
          }}
        >
          save
        </button>
      </div>
      <EditGroupNav parentId={parentId} setNavParent={setNavParent} />
      <EditGroupParent parentId={parentId} group={group} />
    </div>
  );
};

const EditGroupNav = ({ parentId, setNavParent }) => {
  const navContent = [
    { invites: "Invite" },
    { memberships: "Membership" },
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

const EditGroupParent = ({ parentId, group }) => {
  if (parentId === "invites") {
    return <InvitesParent group={group} />;
  } else if (parentId === "memberships") {
    return <EditInvite />;
  } else if (parentId === "delete") {
    return <DeleteGroup />;
  }
};

// EditGroup.propTypes = {};

export default InjectIntl(EditGroup);
