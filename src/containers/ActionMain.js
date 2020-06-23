import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import ActionMain from "components/ActionMain";
import * as actions from "actions/ActionMain";

const mapStateToProps = (state, props) => {
  return {
    redirect: state.config.redirect
  };
};

const ActionMainContainer = connect(mapStateToProps)(ActionMain);

export default i18n(ActionMainContainer);
