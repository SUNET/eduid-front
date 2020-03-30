import React, { Component } from "react";
import PropTypes from "prop-types";

import i18n from "../../login/translation/InjectIntl_HOC_factory";
import DataTableRow from "./DataTableRow/DataTableRow";

class DataTable extends Component {
  render() {
    // console.log("this is this.props.entries:", this.props.entries);
    let data = this.props.entries;

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
  entries: PropTypes.array,
  handleStartConfirmation: PropTypes.func.isRequired,
  handleMakePrimary: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default i18n(DataTable);
