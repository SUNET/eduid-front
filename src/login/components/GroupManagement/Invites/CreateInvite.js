import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInviteForm from "./CreateInviteForm.js";

function CreateInvite(props) {
  const handleCreateInvite = (e) => {
    e.preventDefault();
    const {
      groupId,
      inviteEmail,
      inviteRoles,
      createInviteMember,
      createInviteOwner,
    } = props;
    // endpoint takes one role per invite
    if (inviteRoles.length > 1) {
      createInviteMember(groupId, inviteEmail);
      createInviteOwner(groupId, inviteEmail);
    } else {
      if (inviteRoles.includes("member")) {
        createInviteMember(groupId, inviteEmail);
      } else if (inviteRoles.includes("owner")) {
        createInviteOwner(groupId, inviteEmail);
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
