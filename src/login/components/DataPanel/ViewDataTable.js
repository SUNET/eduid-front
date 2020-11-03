import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";
// import DataTableRow from "./DataTableRow/DataTableRow";

const ViewDataTable = (props) => {
  // let data = this.props.data;
  // console.log("this is data in Table", data);
  // console.log("these are props in ViewDataTable", props);

  return (
    <div className={"view-data"}>
      <div className="title">
        <label
          style={{
            fontSize: "16px",
            letterSpacing: "0",
            paddingBottom: "10px",
          }}
        >
          Groups I manage
        </label>
         <a href="#">
          <button
            className={"edit-button"}
            onClick={() => {
              props.toggleEditMode();
            }}
          >
            edit
          </button>
        </a> 
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
