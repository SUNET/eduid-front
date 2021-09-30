import React from "react";
import { useSelector } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import AllInvitesListItem from "./AllInvitesListItem";
import addRoleInfoToInvites from "../../../app_utils/helperFunctions/addRoleInfoToInvites";

const RenderAllInvitesListHeading = () => {
  let headingText = ["Invites", "Member", "Owner", "", ""];
  return (
    <div className="list-grid" id="five-columns">
      {headingText.map((text, i) => (
        <div key={i} className="list-cell">
          <label>{text}</label>
        </div>
      ))}
    </div>
  );
};

const RenderAllInvitesItems = () => {
  // invites data from redux store
  const invitesToMe = useSelector((state) => state.invites.invitesToMe);
  const invitesToMeByRole = addRoleInfoToInvites(invitesToMe);
  return (
    <div className="list-data invites">
      <ul>
        {invitesToMeByRole.map((invite, i) => (
          <AllInvitesListItem key={i} invite={invite} />
        ))}
      </ul>
    </div>
  );
};

const AllInvitesList = () => {
  return (
    <div className="view-data">
      <div className="invites-list">
        <div className="list-data invites">
          <RenderAllInvitesListHeading />
          <RenderAllInvitesItems />
        </div>
      </div>
    </div>
  );
};

// InvitesList.propTypes = {};

export default InjectIntl(AllInvitesList);
