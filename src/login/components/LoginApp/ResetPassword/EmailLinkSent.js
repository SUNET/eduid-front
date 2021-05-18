import React from "react";
import { withRouter } from "react-router-dom";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";

function EmailLinkSent(){
  return (
   <h1>SUCCESS</h1>
  ) 
}

EmailLinkSent.propTypes = {
  translate: PropTypes.func,
  sendLink: PropTypes.func,
  invalid: PropTypes.bool
};

export default i18n(withRouter(EmailLinkSent));