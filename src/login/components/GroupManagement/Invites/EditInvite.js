import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const EditInvite = (props) => {
  return (
    <div className="invites">
      <div className="edit-invite">
          <h3>Manage memberships of your group</h3>
        <p>
          As members, users belong to your group and as owners they are also
          able to edit the group and who belongs to it. Users can also be
          removed form the group.
        </p>
      </div>
    </div>
  );
};

// EditGroup.propTypes = {};

export default InjectIntl(EditInvite);
