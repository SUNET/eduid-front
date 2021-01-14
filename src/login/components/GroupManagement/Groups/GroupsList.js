import React from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import GroupListItem from "./GroupListItem";

const GroupsList = (props) => {
  return (
    <div className="view-data">
      <div className="list-grid">
        <div className="list-cell"></div>
        <div className="list-cell">
          <label>Owner</label>
        </div>
        <div className="list-cell">
          <label>Member</label>
        </div>
        <div className="list-cell"></div>
      </div>
      <ul>
        {props.userGroupData.map((group) => (
          <GroupListItem
            key={group.identifier}
            group={group}
            toggleGroupsListOrEditGroup={props.toggleGroupsListOrEditGroup}
          />
        ))}
      </ul>
    </div>
  );
};

GroupsList.propTypes = {};

export default i18n(GroupsList);
