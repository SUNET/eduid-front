import { connect } from "react-redux";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import AccountCreated from "components/AccountCreated";

const mapStateToProps = (state) => {
  return {
    email: state.email.email
  };
};

const mapDispatchToProps = () => {
  return {};
};

const AccountCreatedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreated);

export default i18n(AccountCreatedContainer);
