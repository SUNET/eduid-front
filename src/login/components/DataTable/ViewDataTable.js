import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";
// import DataTableRow from "./DataTableRow/DataTableRow";

const ViewDataTable = (props) => {
  // let data = this.props.data;
  // console.log("this is data in Table", data);
  console.log("these are props in VireDataTable", props);

  return (
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
      <div className="groups-grid">
        <div
          style={{
            borderTop: "2px solid white",
            borderBottom: "2px solid white",
            display: "flex",
            padding: "0 0.375rem",
            justifyContent: "space-between",
            alignItems: "baseline",
            height: "3rem",
          }}
        >
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              padding: "0  0.75rem 0 0.375rem",
            }}
          >
            ^
          </p>
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0",
              }}
            >
              First ever group
            </p>
            <a href="#">
              <button
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "0 0 0",
                  textDecoration: "underline",
                  margin: "0",
                  fontWeight: "400",
                }}
                className={"edit-button"}
                onClick={() => {
                  props.toggleEditMode();
                }}
              >
                edit
              </button>
            </a>
          </div>
        </div>
        <div
          style={{
            borderBottom: "2px solid white",
            display: "flex",
            padding: "0 0.375rem",
            justifyContent: "space-between",
            alignItems: "baseline",
            height: "3rem",
          }}
        >
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              padding: "0 0.75rem 0 0.375rem",
            }}
          >
            ^
          </p>
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0",
              }}
            >
              Second ever group
            </p>
            <a href="#">
              <button
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "0 0 0",
                  textDecoration: "underline",
                  margin: "0",
                  fontWeight: "400",
                }}
                className={"edit-button"}
                onClick={() => {
                  props.toggleEditMode();
                }}
              >
                edit
              </button>
            </a>
          </div>
        </div>
        <div
          style={{
            borderBottom: "2px solid white",
            display: "flex",
            padding: "0 0.375rem",
            justifyContent: "space-between",
            alignItems: "baseline",
            height: "3rem",
          }}
        >
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              padding: "0  0.75rem 0 0.375rem",
            }}
          >
            ^
          </p>
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <p
              style={{
                fontSize: "1.5rem",
                paddingBottom: "0",
              }}
            >
              Group 3
            </p>
            <a href="#">
              <button
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "0 0 0",
                  textDecoration: "underline",
                  margin: "0",
                  fontWeight: "400",
                }}
                className={"edit-button"}
                onClick={() => {
                  props.toggleEditMode();
                }}
              >
                edit
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ViewDataTable.propTypes = {
  data: PropTypes.any,
  handleStartConfirmation: PropTypes.func,
  handleMakePrimary: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default i18n(ViewDataTable);
