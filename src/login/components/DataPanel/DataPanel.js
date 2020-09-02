import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const RenderViewData = (props) => {
  // this is a placeholder button for now
  return (
    <Fragment>
      {!props.editDataMode && (
        <div
          style={{
            backgroundColor: "hotpink",
          }}
          className={"view-data"}
        >
          view-mode: A table of data - only for viewing! Don't touch!
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
          edit-mode: A table of data and a number of options for editing data!
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
    this.state = { editDataMode: false};
  }

  render() {
    return (
      <div
        className={"data-panel"}
        style={{
          backgroundColor: "yellow",
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
