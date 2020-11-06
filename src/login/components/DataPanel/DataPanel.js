import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import ViewMode from "./ViewMode";
import EditMode from "./EditMode";

class DataPanel extends Component {
  state = { editMode: false };

  toggleViewOrEditMode = () => {
    this.setState((prevState) => {
      return {
        editMode: !prevState.editMode,
      };
    });
  };

  render() {
    console.log("this is props in dtaa panel:", this.props);
    return (
      <div className="data-panel">
        {this.state.editMode ? (
          <EditMode
            {...this.props}
            toggleViewOrEditMode={this.toggleViewOrEditMode}
          />
        ) : (
          <ViewMode
            {...this.props}
            toggleViewOrEditMode={this.toggleViewOrEditMode}
          />
        )}
      </div>
    );
  }
}

DataPanel.propTypes = {};

export default InjectIntl(DataPanel);
