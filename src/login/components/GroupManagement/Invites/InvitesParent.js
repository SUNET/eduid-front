import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInvite";
import InvitesList from "./InvitesList";

const RenderEditInviteText = () => (
  <div className="edit-invite">
    <h3>Manage memberships in your group</h3>
    <p>
      As members, users belong to the group and as owners, they can also edit
      the group and who belongs to it. Users can also be removed from the group.
    </p>
  </div>
);

const InvitesParent = ({ group }) => {
  let { identifier } = group;
  const navId = useSelector((state) => state.groups.navId);
  const invitesFromMe = useSelector((state) => state.invites.invitesFromMe);
  const [allInvitesFromMe, setAllInvitesFromMe] = useState([]);
  const [groupIdsArray, setGroupIdsArray] = useState([]);

  useEffect(() => {
    if (invitesFromMe !== undefined) {
      setAllInvitesFromMe(invitesFromMe);
      setGroupIdsArray(allInvitesFromMe.map((group) => group.group_identifier));
    }
  }, [invitesFromMe]);

  return (
    <div className="invites">
      {navId === "edit-invite" ? (
        <RenderEditInviteText />
      ) : (
        <CreateInvite groupId={identifier} />
      )}
      {groupIdsArray.includes(identifier) && (
        <InvitesList groupId={identifier} allInvitesFromMe={allInvitesFromMe} />
      )}
    </div>
  );
};

// InvitesParent.propTypes = {};

export default InjectIntl(InvitesParent);
