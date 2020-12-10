import { connect } from "react-redux";
import NameDisplay from "components/NameDisplay";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const mapStateToProps = (state) => {
  return {
    firstName: state.personal_data.data.given_name,
    lastName: state.personal_data.data.surname
  };
};

const mapDispatchToProps = () => {
  return {};
};

const NameDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameDisplay);

export default i18n(NameDisplayContainer);
