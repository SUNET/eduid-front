import React from "react";
import { useDispatch } from "react-redux";
import { deleteGroup } from "../../../redux/actions/deleteGroupActions";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import EduIDButton from "../../../../components/EduIDButton";

const DeleteGroup = ({ groupId, toggleGroupsListOrEditGroup }) => {
  const dispatch = useDispatch();
  return (
    <div className="delete-group">
      <h3>Delete your group</h3>
      <p>Deleting the group will permanently remove it from all its users.</p>
      <EduIDButton
        type="submit"
        className="settings-button"
        onClick={() => {
          dispatch(deleteGroup(groupId));
          toggleGroupsListOrEditGroup("");
        }}
      >
        Delete group
      </EduIDButton>
    </div>
  );
};

// EditGroup.propTypes = {};

export default InjectIntl(DeleteGroup);
