import React, { Component } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InviteListItem from "./InviteListItem";
import invitesByRole from "../helperFunctions/invitesByRole";

const InvitesList = ({ groupId, allInvitesFromMe }) => {
  let invitesForGroup = allInvitesFromMe.filter(
    (invite) => invite.group_identifier === groupId
  );
  let invitesFromMeByRole = invitesByRole();

  return (
    <div className="invites-list">
      <h3>Sent invites</h3>
      <div className="list-data invites">
        <div className="list-grid" id="three-columns">
          <div className="list-cell left-align">
            <label>Invites</label>
          </div>
          <div className="list-cell">
            <label>Owner</label>
          </div>
          <div className="list-cell">
            <label>Member</label>
          </div>
        </div>
        <ul>
          {invitesFromMeByRole.map((invite, i) => (
            <InviteListItem
              key={i}
              invite={invite}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
// }

// InvitesList.propTypes = {};

export default InjectIntl(InvitesList);
