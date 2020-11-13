import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import {
  RenderAdminList,
  RenderMemberList,
} from "../GroupListItem";

const SingleGroup = (props) => {
  return (
    <Fragment>
      <RenderAdminList group={props.group} />
      <RenderMemberList group={props.group} />
    </Fragment>
  );
};

const EditMode = (props) => {
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit your group {props.group.group.display_name}</p>
        <button
          className="save-button"
          onClick={() => {
            props.toggleViewOrEditMode();
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
          <p>Delete</p>
        </li>
      </nav>
      <div className="group-data">
        <SingleGroup group={props.group} />
      </div>
    </div>
  );
};

EditMode.propTypes = {};

export default i18n(EditMode);
