import React, { Component } from "react";
import PropTypes from "prop-types";

import i18n from "../../translation/InjectIntl_HOC_factory";
// import DataTableRow from "./DataTableRow/DataTableRow";

const DataTableGroups = () => {
  // let data = this.props.data;
  // console.log("this is data in Table", data);
        
  return (
    <div className="table-responsive">
      <table className="table-form">
        <tbody>
          <tr>
            <td className="data-cell">data 1</td>
            <td className="remove-data">
              <p className="icon-button">X</p>
            </td>
          </tr>
          <tr>
            <td className="data-cell">data 2</td>
            <td className="remove-data">
              <p className="icon-button">X</p>
            </td>
          </tr>
          <tr>
            <td className="data-cell">data 3</td>
            <td className="remove-data">
              <p className="icon-button">X</p>
            </td>
          </tr>
          <tr>
            <td className="data-cell">data 4</td>
            <td className="remove-data">
              <p className="icon-button">X</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

DataTableGroups.propTypes = {
  data: PropTypes.any,
  handleStartConfirmation: PropTypes.func,
  handleMakePrimary: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default i18n(DataTableGroups);
