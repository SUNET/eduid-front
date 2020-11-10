import React, { Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

const RenderGroupList = (props) => (
  <Fragment>
    <label>Groups I manage</label>
    <ul>
      {props.owner_of.map((group, i) => {
        return (
          <li key={group.identifier}>
            <div className="element-pair">
              <button className="dropdown">^</button>
              <p>{group.display_name}</p>
            </div>
            <button
              onClick={() => {
                props.toggleViewOrEditMode();
              }}
            >
              edit
            </button>
          </li>
        );
      })}
    </ul>
  </Fragment>
);

const ViewMode = (props) => {
  return (
    <div className="view-data">
      <RenderGroupList {...props} />
    </div>
  );
};

ViewMode.propTypes = {
  data: PropTypes.any,
  handleStartConfirmation: PropTypes.func,
  handleMakePrimary: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default i18n(ViewMode);
