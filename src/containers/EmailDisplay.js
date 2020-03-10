import { connect } from "react-redux";
import EmailDisplay from "components/EmailDisplay";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  const emailAddress = state.emails.emails.filter(email => email.primary);
  return {
    email: emailAddress
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const EmailDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailDisplay);

export default i18n(EmailDisplayContainer);
