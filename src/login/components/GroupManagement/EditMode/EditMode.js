import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesParent from "./InvitesParentContainer";

const EditMode = (props) => {
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit your group {props.group.group.display_name}</p>
        <button
          className="save-button"
          onClick={() => {
            props.toggleViewOrEditMode(props.group.group);
          }}
        >
          save
        </button>
      </div>
      <nav>
        <li>
          <p>Invites</p>
        </li>
        <li>
          <p>People</p>
        </li>
        <li>
          <p>Delete</p>
        </li>
      </nav>
      <InvitesParent group={props.group.group} />
    </div>
  );
};

EditMode.propTypes = {};

export default i18n(EditMode);
