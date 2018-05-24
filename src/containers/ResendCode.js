
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import ResendCode from 'components/ResendCode';

const mapStateToProps = (state, props) => {
    return {
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        handleResend: (e) => {
        }
    }
};

const ResendCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResendCode);

export default i18n(ResendCodeContainer);
