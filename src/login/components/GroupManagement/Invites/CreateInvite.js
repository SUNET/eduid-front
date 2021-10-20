import React from "react";
import { useDispatch } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInviteForm from "./CreateInviteForm.js";
import * as inviteActions from "../../../redux/actions/createInviteActions";

function CreateInvite(props) {
  const dispatch = useDispatch();
  const handleCreateInvite = (e) => {
    e.preventDefault();
    const { groupId, inviteEmail, inviteRoles } = props;
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
