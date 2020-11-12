import React, { Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";
import Group from "../App/DashboardApp/Settings/Groups/Group";

const RenderGroupList = (props) => {
  return (
    <Fragment>
      <ul>
        <li>
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
        </li>
        {props.uniqueGroups.map((group, i) => (
          <Group
            key={group.identifier}
            group={group}
            username={props.primaryEmailAddress}
            toggleViewOrEditMode={props.toggleViewOrEditMode}
          />
        ))}
      </ul>
    </Fragment>
  );
};

const ViewMode = (props) => {
  return (
    <div className="view-data">
      <RenderGroupList {...props} />
    </div>
  );
};

ViewMode.propTypes = {};

export default i18n(ViewMode);
