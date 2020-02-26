import { connect } from "react-redux";
import EmailDisplay from "./EmailDisplay";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state, props) => {
  // const emailAddress = state.emails.emails.filter(email => email.primary);
  // return {
  //   email: emailAddress
  // };
  return {
    email: state.login.email
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const EmailDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailDisplay);

export default InjectIntl(EmailDisplayContainer);
