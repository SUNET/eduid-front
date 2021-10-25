import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import GroupNameForm from "../GroupNameForm";
import * as createGroupActions from "../../../redux/actions/createGroupActions";
import { useDispatch, useSelector } from "react-redux";

export const CloseButton = () => (
  <svg
    className="close"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 0h2v16H7z" />
    <path d="M0 9V7h16v2z" />
  </svg>
);

const RenderWizardOrCreateGroupHeading = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <p>
        {props.hasNoGroups ? "Create your first group." : "Create a new group."}
      </p>
      <button
        onClick={
          props.hasNoGroups
            ? () => console.log("This will expand a minimised wizard")
            : () => dispatch(createGroupActions.closeCreateGroup())
        }
      >
        <CloseButton />
      </button>
    </>
  );
};

function CreateGroup(props) {
  const dispatch = useDispatch();
  const groupName = useSelector((state) => state.form.groupName);
  let groupNameValues = { groupName: "" };
  if (groupName !== undefined) {
    groupNameValues = groupName.values;
  }

  const handleGroupName = (e) => {
    e.preventDefault();
    let groupName = groupNameValues.groupName;
    let trimmedGroupName = groupName.trim();
    dispatch(createGroupActions.createGroup(trimmedGroupName));
    dispatch(createGroupActions.closeCreateGroup());
  };

  return (
    <>
      <div className="wizard">
        <div className="title">
          <RenderWizardOrCreateGroupHeading {...props} />
        </div>
        <p>
          As the creator of a group you will be an admin, which allows you to
          edit the group and send out invites.
        </p>
        <div className="group-name">
          <GroupNameForm
            form={"groupName"}
            label={"Group name"}
            placeholder={"Name your group"}
            helpBlock={""}
            submitButton={true}
            handleSubmit={handleGroupName}
          />
        </div>
      </div>
    </>
  );
}

// CreateGroup.propTypes = {};

export default InjectIntl(CreateGroup);
