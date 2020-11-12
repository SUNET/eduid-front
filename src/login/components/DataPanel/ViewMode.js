import React, { Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";
import Group from "../App/DashboardApp/Settings/Groups/Group";

const GroupsTableHeader = (props) => (
  <div className="list-grid">
    <div className="list-cell"></div>
    <div className="list-cell">
      <label>Admin</label>
    </div>
    <div className="list-cell">
      <label>Member</label>
    </div>
    <div className="list-cell"></div>
  </div>
);

const ViewMode = (props) => {
  return props.uniqueGroups !== undefined ? (
    <div className="view-data">
      <ul>
        {props.openGroup ? null : <GroupsTableHeader {...props} />}
        {props.uniqueGroups.map((group, i) => (
          <Group
            key={group.identifier}
            group={group}
            toggleViewOrEditMode={props.toggleViewOrEditMode}
          />
        ))}
      </ul>
    </div>
  ) : null;
};

ViewMode.propTypes = {};

export default i18n(ViewMode);
