
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import CodeVerified from 'components/CodeVerified';

const mapStateToProps = (state, props) => {
    const url = '';
    return {
        dashboard_url: url,
        password: state.verified.password,
        eppn: state.verified.eppn,
        nonce: state.verified.nonce,
        ts: state.verified.timestamp,
        token: state.verified.token,
        email: state.email.email
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
      gotIt: (e) =>{},
    }
};

const CodeVerifiedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeVerified);

export default i18n(CodeVerifiedContainer);
