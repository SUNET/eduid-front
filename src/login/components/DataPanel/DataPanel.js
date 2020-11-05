import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import ViewData from "./ViewDataTable";
import EditData from "./EditDataBox";

const RenderViewOrEditMode = (props) => {
  return props.toggleState ? <EditData {...props} /> : <ViewData {...props} />;
};

class DataPanel extends Component {
  state = { editDataMode: false };

  toggleMode = () => {
    this.setState((prevState) => {
      return {
        editDataMode: !prevState.editDataMode,
      };
    }), () => {
      console.log("this is the updated state:", this.state.editDataMode);
    };
  };

  render() {
    return (
      <div className="data-panel">
        <RenderViewOrEditMode
          toggleMode={this.toggleMode}
          toggleState={this.state.editDataMode}
          {...this.props}
        />
      </div>
    );
  }
}

DataPanel.propTypes = {};

export default InjectIntl(DataPanel);
