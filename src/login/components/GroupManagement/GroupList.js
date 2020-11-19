import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";
import GroupListItem from "./GroupListItem";

const GroupList = (props) => {
  console.log(props.uniqueGroups)
  return props.uniqueGroups !== undefined ? (
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
        {props.uniqueGroups.map((group) => (
          <GroupListItem
            key={group.group.identifier}
            group={group}
            toggleViewOrEditMode={props.toggleViewOrEditMode}
          />
        ))}
      </ul>
    </div>
  ) : null;
};

GroupList.propTypes = {};

export default i18n(GroupList);
