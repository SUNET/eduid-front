import React, { Component } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInviteContainer";
import InvitesList from "./InvitesList";
import EditInvite from "../Invites/EditInvite";

const InvitesParent = ({
  groupsWithInvites,
  allInvitesFromMe,
  group,
  navId,
}) => {
  let { identifier } = group;
  let groupHasInvites = groupsWithInvites.includes(identifier);
  return (
    <div className="invites">
      {navId === "edit-invite" ? (
        <EditInvite />
      ) : (
        <CreateInvite groupId={identifier} />
      )}
      {groupHasInvites && (
        <InvitesList
          navId={navId}
          groupId={identifier}
          allInvitesFromMe={allInvitesFromMe}
        />
      )}
    </div>
  );
};

// InvitesParent.propTypes = {};

export default InjectIntl(InvitesParent);
