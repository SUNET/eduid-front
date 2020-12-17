import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import CodeVerified from "components/CodeVerified";

const mapStateToProps = (state) => {
  // const url = "";
  return {
    dashboard_url: state.config.dashboard_url,
    password: state.verified.password,
    email: state.verified.email,
    status: state.verified.status
  };
};

const CodeVerifiedContainer = connect(mapStateToProps)(CodeVerified);

export default i18n(CodeVerifiedContainer);
