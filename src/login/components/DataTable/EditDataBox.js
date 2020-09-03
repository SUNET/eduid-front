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
      }}
      className={"edit-data"}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "700" }}>Edit your group First ever group</p>
        <p>X</p>
      </div>
      edit mode
      <p>
        edit-mode: A table of data and a number of options for editing data!
      </p>
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
