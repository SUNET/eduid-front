import { connect } from "react-redux";
import AddNin from "components/AddNin";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    nins: state.nins.nins,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const AddNinContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNin);

export default i18n(AddNinContainer);