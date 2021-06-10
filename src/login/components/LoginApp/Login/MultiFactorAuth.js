import React from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let MultiFactorAuth = () => {
  return (
    <div>
      <p>this is multi-factor authentication</p>
    </div>
  );
};

MultiFactorAuth.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(MultiFactorAuth);
