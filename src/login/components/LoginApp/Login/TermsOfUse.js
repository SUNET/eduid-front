import React from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";


let TermOfUse = () => {
  return (
    <div>
      <p>this is terms of use</p>
    </div>
  );
};

TermOfUse.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(TermOfUse);
