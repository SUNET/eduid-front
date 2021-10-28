import { connect } from "react-redux";
import EmailDisplay from "./EmailDisplay";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  // const emailAddress = state.emails.emails.filter(email => email.primary);
  // return {
  //   email: emailAddress
  // };
  return {
    email: state.getEmailLink.email,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const EmailDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailDisplay);

export default InjectIntl(EmailDisplayContainer);
