import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import ViewDataTable from "../DataTable/ViewDataTable";
import EditDataBox from "../DataTable/EditDataBox";

const RenderViewData = (props) => {
  // this is a placeholder button for now
  return (
    <Fragment>
      {!props.editDataMode && (
        <div
          style={{
            backgroundColor: "transparent",
            marginTop: "2rem",
          }}
          className={"view-data"}
        >
          <label
            style={{
              fontSize: "16px",
              letterSpacing: "0",
              paddingBottom: "10px",
            }}
          >
            Groups I manage
          </label>
          <ViewDataTable {...props} />
        </div>
      )}
    </Fragment>
  );
};

const RenderEditData = (props) => {
  // this is a placeholder button for now
  return (
    <Fragment>{props.editDataMode && <EditDataBox {...props} />}</Fragment>
  );
};

class DataPanel extends Component {
  // this component should:
  // 1. handle the logic of rendering data in either view-mode (no interactions) vs edit-mode (alterations allowed)
  //

  state = { editDataMode: true };

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
