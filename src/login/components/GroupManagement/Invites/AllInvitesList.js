import React from "react";
import { useSelector } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import AllInvitesListItem from "./AllInvitesListItem";

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
  // invitesToMe mutated into below
  // structure by helper function
  let invitesToMeByRole = [
    {
      display_name: "Group 1",
      email_address: "njons13@test.com",
      group_identifier: "f60657f6-8e38-4011-9747-19fecbc34442",
      roles: ["owner", "member"],
      member: true,
      owner: true,
    },
    {
      display_name: "Group 2",
      email_address: "njons13@test.com",
      group_identifier: "a45e1518-cce5-4027-b832-5539fbbc873e",
      roles: ["owner", "member"],
      member: true,
      owner: true,
    },
  ];
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

const AllInvitesList = (props) => {
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
