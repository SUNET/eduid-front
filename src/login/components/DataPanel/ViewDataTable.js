import React from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

const ViewDataTable = (props) => {
  return (
    <div className={"view-data"}>
      <div className="title">
        <label>
          Groups I manage
        </label>
      </div>
      <div className="group-data">
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
      </div>
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
