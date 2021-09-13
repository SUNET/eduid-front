import React from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const NameDisplay = ({ label, name }) => (
  <div className="profile-grid-cell">
    <label>{label}</label>
    <p className="display-data verified">{name}</p>
  </div>
);

export default InjectIntl(NameDisplay);
