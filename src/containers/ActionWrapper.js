import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import ActionWrapper from "components/ActionWrapper";
import * as actions from "actions/ActionWrapper";

const mapStateToProps = (state, props) => {
  return {
    redirect: state.config.redirect
  };
};

const ActionWrapperContainer = connect(mapStateToProps)(ActionWrapper);

export default i18n(ActionWrapperContainer);
