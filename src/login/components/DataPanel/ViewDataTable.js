import React, { Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

const RenderGroupList = (props) => (
  <Fragment>
    <label>Groups I manage</label>
    <ul>
      {props.owner_of.map((group, i) => {
        console.log("this is group", group);
        return (
          <li key={group.identifier}>
            <div className="element-pair">
              <button className="dropdown">^</button>
              <p>{group.display_name}</p>
            </div>
            <button>edit</button>
          </li>
        );
      })}
    </ul>
  </Fragment>
);

const ViewDataTable = (props) => {
  return (
    <div className="view-data">
      <RenderGroupList {...props} />
    </div>
  );
};

ViewDataTable.propTypes = {
  data: PropTypes.any,
  handleStartConfirmation: PropTypes.func,
  handleMakePrimary: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default i18n(ViewDataTable);
