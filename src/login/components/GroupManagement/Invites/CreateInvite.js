import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInviteForm from "./CreateInviteForm.js";
import * as inviteActions from "../../../redux/actions/createInviteActions";

function CreateInvite(props) {
  const dispatch = useDispatch();
  const createInvite = useSelector((state) => state.form.createInvite);
  let createInviteValues = {};
  let inviteEmail = {};
  let inviteRoles = [];
  if (createInvite !== undefined) {
    createInviteValues = createInvite.values;
    inviteEmail = createInviteValues.inviteEmail.email;
    let rolesArr = Object.entries(createInviteValues.inviteRoles);
    inviteRoles = rolesArr
      .map((role) => {
        if (role.includes(true)) {
          return role[0];
        } else {
          return null;
        }
      })
      .filter((role) => role !== null);
  }

  const handleCreateInvite = (e) => {
    e.preventDefault();
    const { groupId } = props;
    // endpoint takes one role per invite
    if (inviteRoles.length > 1) {
      dispatch(inviteActions.createInviteMember(groupId, inviteEmail));
      dispatch(inviteActions.createInviteOwner(groupId, inviteEmail));
    } else {
      if (inviteRoles.includes("member")) {
        dispatch(inviteActions.createInviteMember(groupId, inviteEmail));
      } else if (inviteRoles.includes("owner")) {
        dispatch(inviteActions.createInviteOwner(groupId, inviteEmail));
      }
    }
  };

  return (
    <div className="create-invite">
      <h3>Invite people to your group</h3>
      <p>
        Add an email address and set a membership to invite anyone to join your
        group.
      </p>
      <CreateInviteForm {...props} handleSubmit={handleCreateInvite} />
    </div>
  );
}

// CreateInvite.propTypes = {};

export default InjectIntl(CreateInvite);
