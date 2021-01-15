import React from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "../Invites/InvitesParentContainer";

const EditGroup = (props) => {
  const { group } = props;
  const { display_name } = props.group;
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
      <nav>
        <li>
          <p>Invites</p>
        </li>
        <li>
          <p>People</p>
        </li>
        <li>
          <p>Delete</p>
        </li>
      </nav>
      <InvitesParent group={group} />
    </div>
  );
};

EditGroup.propTypes = {};

export default i18n(EditGroup);
