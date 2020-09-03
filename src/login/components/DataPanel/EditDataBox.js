import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

const EditDataBox = (props) => {
  console.log("these are props in EditDataBox", props);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
      className={"edit-data"}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "700" }}>Edit your group First ever group</p>
        <a href="#">
          <button
            style={{
              backgroundColor: "transparent",
              boxShadow: "0 0 0",
              textDecoration: "underline",
              margin: "0",
              fontWeight: "400",
            }}
            className={"save-button"}
          >
            save
          </button>
        </a>
      </div>
      <nav
        style={{
          display: "flex",
          margin: "0 1rem 0 0",
          fontFamily: "Akkurat",
        }}
      >
        <li
          style={{
            marginRight: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "1rem",
              textDecoration: "underline",
              color: "#ff4500",
            }}
          >
            Invites
          </p>
        </li>
        <li
          style={{
            marginRight: "1rem",
          }}
        >
          <p
            style={{
              textDecoration: "underline",
              fontSize: "1rem",
              color: "#161616",
            }}
          >
            Delete
          </p>
        </li>
      </nav>
      <div
        style={{
          margin: "1rem 0",
        }}
      >
        <p style={{ fontWeight: "700" }}> Invite people to your group</p>
        <p>
          You can invite people to a group via their email address. All invites
          will be sent to members, but you can upgrade specific individials to
          fellow admins.
        </p>
        <div>
          <label style={{ fontSize: "16px", letterSpacing: "0" }}>
            Email address
          </label>
          <div style={{ display: "flex" }}>
            <input style={{ backgroundColor: "#F4F4F4" }} />
            <button
              style={{
                backgroundColor: "#c4c4c4",
                color: "white",
                margin: "0 0 0 1rem",
              }}
              className={"add-button"}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

EditDataBox.propTypes = {
  data: PropTypes.any,
  handleStartConfirmation: PropTypes.func,
  handleMakePrimary: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default i18n(EditDataBox);
