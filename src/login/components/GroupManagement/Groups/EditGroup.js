import React, { useState } from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "../Invites/InvitesParentContainer";

const EditGroupNav = ({ parentId, setNavParent }) => {
  return (
    <nav>
      <li onClick={(e) => setNavParent(e.target.id)}>
        <p className={parentId ? "active" : null} id="invites">
          Invites
        </p>
      </li>
      <li onClick={(e) => setNavParent(e.target.id)}>
        <p id="people">People</p>
      </li>
      <li onClick={(e) => setNavParent(e.target.id)}>
        <p id="delete">Delete</p>
      </li>
    </nav>
  );
};

const RenderEditGroupParent = ({ parentId, group }) => {
  if (parentId === "invites") {
    return <InvitesParent group={group} />;
  } else if (parentId === "people") {
    return <p>this is people section of Nav</p>;
  } else if (parentId === "delete") {
    return <p>this is Delete section of Nav</p>;
  }
};

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
        setNavParent={setNavParent}
        parentId={parentId}
        {...props}
      />
      <RenderEditGroupParent parentId={parentId} {...props} />
    </div>
  );
};

EditGroup.propTypes = {};

export default i18n(EditGroup);
