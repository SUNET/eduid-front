import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import ActionMain from "components/ActionMain";

const mapStateToProps = (state) => {
  return {
    redirect: state.config.redirect
  };
};

const ActionMainContainer = connect(mapStateToProps)(ActionMain);

export default i18n(ActionMainContainer);
