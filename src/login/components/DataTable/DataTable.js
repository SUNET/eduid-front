import React, { Component } from "react";
import PropTypes from "prop-types";

import i18n from "../../translation/InjectIntl_HOC_factory";
import DataTableRow from "./DataTableRow/DataTableRow";

class DataTable extends Component {
  render() {
    let data = this.props.data;
    // console.log("this is data in Table", data);

    return (
      <div className="table-responsive">
        <table className="table-form">
          <tbody>
            <DataTableRow
              data={data}
              handleStartConfirmation={this.props.handleStartConfirmation}
              handleMakePrimary={this.props.handleMakePrimary}
              handleRemove={this.props.handleRemove}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

DataTable.propTypes = {
  data: PropTypes.any,
  handleStartConfirmation: PropTypes.func,
  handleMakePrimary: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default i18n(DataTable);
