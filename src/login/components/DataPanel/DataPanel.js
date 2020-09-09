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
  // this component should:
  // 1. handle the logic of rendering data in either view-mode (no interactions) vs edit-mode (alterations allowed)
  //

  state = { editDataMode: false };

  toggleEditMode = () => {
    console.log("you're toggling state.editDataMode");
    this.setState(
      (prevState) => {
        return {
          editDataMode: !prevState.editDataMode,
        };
      },
      () => {
        console.log(
          "this is the updated state.editDataMode:",
          this.state.editDataMode
        );
      }
    );
  };

  render() {
    return (
      <div
        className={"data-panel"}
        style={{
          backgroundColor: "transparent",
          margin: "1rem 0 ",
        }}
      >
        <RenderViewData
          {...this.props}
          toggleEditMode={this.toggleEditMode}
          editDataMode={this.state.editDataMode}
        />
        <RenderEditData editDataMode={this.state.editDataMode} />
      </div>
    );
  }
}

DataPanel.propTypes = {};

export default InjectIntl(DataPanel);
