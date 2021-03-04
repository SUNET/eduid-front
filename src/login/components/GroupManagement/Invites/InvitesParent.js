import React, { Component } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInviteContainer";
import InvitesList from "./InvitesList";

const InvitesParent = ({ groupsWithInvites, allInvitesFromMe, group }) => {
  let { identifier } = group;
  let groupHasInvites = groupsWithInvites.includes(identifier);
  return (
    <div className="invites">
      <CreateInvite groupId={identifier} />
      {groupHasInvites ? (
        <InvitesList groupId={identifier} allInvitesFromMe={allInvitesFromMe} />
      ) : null}
    </div>
  );
};

// InvitesParent.propTypes = {};

export default InjectIntl(InvitesParent);
