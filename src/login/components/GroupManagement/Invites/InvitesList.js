import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InviteListItem from "./InviteListItem";
import invitesByRole from "../../../app_utils/helperFunctions/invitesByRole";

const RenderListHeading = () => {
  return (
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
  );
};

const InvitesList = ({ groupId, allInvitesFromMe, navId }) => {
  let invitesForGroup = allInvitesFromMe.filter(
    (invite) => invite.group_identifier === groupId
  );
  let invitesFromMeByRole = invitesByRole(invitesForGroup);
  return (
    <div className="invites-list">
      <h3>Sent invites</h3>
      <div className="list-data invites">
        <RenderListHeading />
        <ul>
          {invitesFromMeByRole.map((invite, i) => (
            <InviteListItem key={i} invite={invite} />
          ))}
        </ul>
      </div>
    </div>
  );
};

// InvitesList.propTypes = {};

export default InjectIntl(InvitesList);
