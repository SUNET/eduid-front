
import { connect } from 'react-redux';

import * as actions from "actions/CodeVerified";
import i18n from 'i18n-messages';
import CodeVerified from 'components/CodeVerified';


const mapStateToProps = (state, props) => {
    const url = '';
    return {
        dashboard_url: state.verified.dashboard_url,
        password: state.verified.password,
        eppn: state.verified.eppn,
        nonce: state.verified.nonce,
        ts: state.verified.timestamp,
        token: state.verified.auth_token,
        email: state.verified.email,
        status: state.verified.status,
    }
};

const mapDispatchToProps = (dispatch, props) => {
};

const CodeVerifiedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeVerified);

export default i18n(CodeVerifiedContainer);
