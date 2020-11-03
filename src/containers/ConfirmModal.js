import { connect } from "react-redux";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import ConfirmModal from "../components/ConfirmModal";
import { isValid, isSubmitting } from "redux-form";

const mapStateToProps = state => {
    return {
      formEnabled: isValid("modal-form")(state) && !isSubmitting("modal-form")(state)
    };
  };

const ConfrimModalContainer = connect(mapStateToProps, null)(ConfirmModal);
export default i18n(ConfrimModalContainer);
