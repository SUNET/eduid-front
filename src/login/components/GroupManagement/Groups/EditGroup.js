import React, { useState } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "../Invites/InvitesParentContainer";

const EditGroup = (props) => {
  const { group } = props;
  const { display_name } = props.group;
  const [parentId, setNavParent] = useState("invites");
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit your group {display_name}</p>
        <button
          className="save-button"
          onClick={() => {
            props.toggleGroupsListOrEditGroup(group);
          }}
        >
          save
        </button>
      </div>
      <EditGroupNav
        parentId={parentId}
        setNavParent={setNavParent}
        {...props}
      />
      <EditGroupParent parentId={parentId} {...props} />
    </div>
  );
};

const EditGroupNav = ({ parentId, setNavParent }) => {
  const navContent = [
    { invites: "Invites" },
    { people: "People" },
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
  } else if (parentId === "people") {
    return <p>this is people section of Nav</p>;
  } else if (parentId === "delete") {
    return <p>this is Delete section of Nav</p>;
  }
};

// EditGroup.propTypes = {};

export default InjectIntl(EditGroup);
