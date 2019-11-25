import { connect } from "react-redux";

import i18n from "i18n-messages";
import ActionWrapper from "components/ActionWrapper";
import * as actions from "actions/ActionWrapper";

const mapStateToProps = (state, props) => {
  return {
    redirect: state.config.redirect,
    is_fetching: state.config.is_fetching
  };
};

const ActionWrapperContainer = connect(
  mapStateToProps
)(ActionWrapper);

export default i18n(ActionWrapperContainer);
