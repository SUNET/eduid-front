import React, { Component } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInviteForm from "./CreateInviteForm.js";

class CreateInvite extends Component {
  handleCreateInvite = (e) => {
    e.preventDefault();
    const {
      groupId,
      inviteEmail,
      inviteRoles,
      createInviteMember,
      createInviteOwner,
    } = this.props;
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

  render() {
    return (
      <div className="create-invite">
        <div className="title">
          <p>Invite people to your group</p>
        </div>
        <p>
          Add an email address and set a membership to invite anyone to join
          your group.
        </p>
        <CreateInviteForm
          {...this.props}
          handleSubmit={this.handleCreateInvite}
        />
      </div>
    );
  }
}

// CreateInvite.propTypes = {};

export default InjectIntl(CreateInvite);
