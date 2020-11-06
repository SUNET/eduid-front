import React, { Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";
import Group from "../App/DashboardApp/Settings/Groups/Group";

const RenderGroupListWithRoleAdmin = (props) => {
  return (
    <Fragment>
      {props.owner_of && (
        <div>
          <label>Groups I manage</label>
          <ul>
            {props.owner_of.map((group, i) => (
              <Group
                key={group.identifier}
                group={group}
                toggleMode={props.toggleMode}
              />
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

const RenderGroupListWithRoleMember = (props) => {
  return (
    <Fragment>
      {props.member_of && (
        <div>
          <label>Groups I am a member of</label>
          <ul>
            {props.member_of.map((group, i) => (
              <Group
                key={group.identifier}
                group={group}
                toggleMode={props.toggleMode}
              />
            ))}
          </ul>
        </div>
      )}
    </Fragment>
  );
};

const ViewMode = (props) => {
  return (
    <div className="view-data">
      <RenderGroupListWithRoleAdmin {...props} />
      <RenderGroupListWithRoleMember {...props} />
    </div>
  );
};

ViewMode.propTypes = {};

export default i18n(ViewMode);
