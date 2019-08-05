import { connect } from "react-redux";
import AccountId from "components/AccountId";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    eppn: state.personal_data.data.eppn
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const AccountIdContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountId);

export default i18n(AccountIdContainer);