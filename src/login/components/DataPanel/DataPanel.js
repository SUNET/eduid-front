import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import DataTableGroups from "../DataTable/DataTableGroups";

const RenderViewData = (props) => {
  // this is a placeholder button for now
  return (
    <Fragment>
      {!props.editDataMode && (
        <div
          style={{
            backgroundColor: "transparent",
          }}
          className={"view-data"}
        >
          <p>view-mode: A table of data - only for viewing! Don't touch!</p>
          <label>Groups I manage</label>
        </div>
      )}
    </Fragment>
  );
};

const RenderEditData = (props) => {
  // this is a placeholder button for now
  return (
    <Fragment>
      {props.editDataMode && (
        <div
          style={{
            backgroundColor: "yellow",
          }}
          className={"edit-data"}
        >
          <p>
            edit-mode: A table of data and a number of options for editing data!
          </p>
        </div>
      )}
    </Fragment>
  );
};

class DataPanel extends Component {
  // this component should:
  // 1. handle the logic of rendering data in either view-mode (no interactions) vs edit-mode (alterations allowed)
  //

  constructor(props) {
    super(props);
    this.state = { editDataMode: false };
  }

  render() {
    return (
      <div
        className={"data-panel"}
        style={{
          backgroundColor: "transparent",
          margin: "1rem 0 ",
        }}
      >
        <RenderViewData editDataMode={this.state.editDataMode} />
        <RenderEditData editDataMode={this.state.editDataMode} />
      </div>
    );
  }
}

DataPanel.propTypes = {};

export default InjectIntl(DataPanel);
