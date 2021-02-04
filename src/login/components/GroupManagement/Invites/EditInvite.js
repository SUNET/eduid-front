import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const EditInvite = () => {
  return (
    <div className="invites">
      <div className="edit-invite">
        <h3>Manage memberships of your group</h3>
        <p>
          As members, users belong to the group and as owners, they can also edit
          the group and who belongs to it. Users can also be removed from the
          group.
        </p>
      </div>
    </div>
  );
};

// EditGroup.propTypes = {};

export default InjectIntl(EditInvite);
