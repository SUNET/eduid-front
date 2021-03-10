import React from "react";
import { useSelector } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InviteListItem from "./InviteListItem";
import invitesByRole from "../../../app_utils/helperFunctions/invitesByRole";

const RenderListHeading = () => {
  const navId = useSelector((state) => state.groups.navId);
  let columnNumber = navId === "edit-invite" ? "four-columns" : "three-columns";
  let headingText =
    columnNumber === "four-columns"
      ? ["Invites", "Member", "Owner", ""]
      : ["Invites", "Member", "Owner"];
  return (
    <div className="list-grid" id={columnNumber}>
      {headingText.map((text, i) => (
        <div key={i} className="list-cell">
          <label>{text}</label>
        </div>
      ))}
    </div>
  );
};

const RenderListItems = ({ invitesForGroup }) => {
  let invitesFromMeByRole = invitesByRole(invitesForGroup);
  return (
    <div className="list-data invites">
      <ul>
        {invitesFromMeByRole.map((invite, i) => (
          <InviteListItem key={i} invite={invite} />
        ))}
      </ul>
    </div>
  );
};

const InvitesList = ({ groupId, allInvitesFromMe }) => {
  let invitesForGroup = allInvitesFromMe.filter(
    (invite) => invite.group_identifier === groupId
  );
  return (
    <div className="invites-list">
      <h3>Sent invites</h3>
      <div className="list-data invites">
        <RenderListHeading />
        <RenderListItems invitesForGroup={invitesForGroup} />
      </div>
    </div>
  );
};

// InvitesList.propTypes = {};

export default InjectIntl(InvitesList);
