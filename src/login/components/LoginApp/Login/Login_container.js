import { connect } from "react-redux";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import Login from "./Login";

const mapStateToProps = () => {
  return {};
};

const LoginContainer = connect(mapStateToProps)(Login);

export default InjectIntl(LoginContainer);
