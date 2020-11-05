import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import ViewDataTable from "./ViewDataTable";
import EditDataBox from "./EditDataBox";

const RenderViewData = (props) => {
  return (
    <Fragment>{!props.editDataMode && <ViewDataTable {...props} />}</Fragment>
  );
};

const RenderEditData = (props) => {
  return (
    <Fragment>{props.editDataMode && <EditDataBox {...props} />}</Fragment>
  );
};

class DataPanel extends Component {
  state = { editDataMode: false };

  toggleEditMode = () => {
    this.setState(
      (prevState) => {
        return {
          editDataMode: !prevState.editDataMode,
        };
      }
    );
  };

  render() {
    return (
      <div className="data-panel" >
        <RenderViewData
          data={this.props.data}
          toggleEditMode={this.toggleEditMode}
          editDataMode={this.state.editDataMode}
        />
        {/* <RenderEditData
          data={this.props.data}
          toggleEditMode={this.toggleEditMode}
          editDataMode={this.state.editDataMode}
        />
      </div>
    );
  }
}

DataPanel.propTypes = {};

export default InjectIntl(DataPanel);
