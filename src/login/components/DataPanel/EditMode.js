import React from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

const EditMode = (props) => {
  console.log("this is props:", props);
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit your group</p>
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
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
      </div>
    </div>
  );
};

EditMode.propTypes = {};

export default i18n(EditMode);
