import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInviteContainer";
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
        <RenderEditInviteText />
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
