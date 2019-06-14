import { connect } from "react-redux";
import { isValid } from "redux-form";
import LookupMobileProofing from "components/LookupMobileProofing";
import { eduidRMAllNotify } from "actions/Notifications";
import { postLookupMobile } from "actions/LookupMobileProofing";
import i18n from "i18n-messages";

const mapStateToProps = (state, props) => {
  return {
    disabled: !isValid("nins")(state)
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLookupMobile: function(e) {
      dispatch(eduidRMAllNotify());
      // dispatch(postLookupMobile());
    }
    // handleLetterProofing: function (e) {
    //   dispatch(eduidRMAllNotify());
    //   dispatch(actions.getLetterProofingState());
    // },
  };
};

const LookupMobileProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LookupMobileProofing);

export default i18n(LookupMobileProofingContainer);
