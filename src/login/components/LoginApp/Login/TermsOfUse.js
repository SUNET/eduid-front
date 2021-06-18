import React from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let TermOfUse = (props) => {
  return (
    <div className="tou">
      <h2 className="heading">{props.translate("login.tou.h2-heading")}</h2>
      <p>{props.translate("login.tou.paragraph")}</p>
    </div>
  );
};

TermOfUse.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(TermOfUse);
