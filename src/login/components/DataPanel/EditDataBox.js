import React from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

const EditDataBox = (props) => {
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit your group</p>
        <button
          className="save-button"
          onClick={() => {
            props.toggleMode();
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

EditDataBox.propTypes = {
  data: PropTypes.any,
  handleStartConfirmation: PropTypes.func,
  handleMakePrimary: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default i18n(EditDataBox);
