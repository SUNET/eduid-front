import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import EmailInUse from "components/EmailInUse";

const mapStateToProps = (state) => {
  return {
    email: state.email.email,
    reset_url: state.config.reset_passwd_url
  };
};

const EmailInUseContainer = connect(mapStateToProps)(EmailInUse);

export default i18n(EmailInUseContainer);
