import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const DeleteGroup = (props) => {
  return (
    <div className="delete-group">
      <div className="invites">
        <div className="edit-invite">
            <h3>Delete group</h3>
          <p>Delete Change membership of those who have joined your group.</p>
        </div>
      </div>
    </div>
  );
};

// EditGroup.propTypes = {};

export default InjectIntl(DeleteGroup);
