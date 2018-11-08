
import { connect } from 'react-redux';
import { isValid } from "redux-form";
import LookupMobileProofing from 'components/LookupMobileProofing';
import { postLookupMobile } from "actions/LookupMobileProofing";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    is_fetching: state.lookup_mobile.is_fetching,
    disabled: ! isValid('nins')(state)
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLookupMobile: function (e) {
      dispatch(postLookupMobile());
    }
  }
};

const LookupMobileProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LookupMobileProofing);

export default i18n(LookupMobileProofingContainer);

