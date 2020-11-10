import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

const SingleGroup = (props) => {
  return (
    <Fragment>
      <p>Everyone loves {props.group.display_name}</p>
      <p>the id for this group is: {props.group.identifier}</p>
      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </Fragment>
  );
};

const EditMode = (props) => {
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit your group {props.group.display_name}</p>
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
