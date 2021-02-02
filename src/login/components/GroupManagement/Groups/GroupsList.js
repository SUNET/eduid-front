import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import GroupListItem from "./GroupListItem";

const GroupsList = (props) => {
  return (
    <div className="view-data">
      <div className="list-grid" id="four-columns">
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
        {props.groupsData.map((group) => (
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

// GroupsList.propTypes = {};

export default InjectIntl(GroupsList);
