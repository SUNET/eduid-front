import { connect } from "react-redux";
import AccountLinking from "components/AccountLinking";
import * as actions from "actions/AccountLinking";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    orcid: state.account_linking.orcid,
    is_configured: state.config.is_configured,
    message: state.account_linking.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleOrcidDelete: function () {
      dispatch(actions.startOrcidRemove());
    },
    handleOrcidConnect: function () {
      dispatch(actions.startOrcidConnect());
    },
  };
};

const AccountLinkingContainer = connect(mapStateToProps, mapDispatchToProps)(AccountLinking);

export default i18n(AccountLinkingContainer);
