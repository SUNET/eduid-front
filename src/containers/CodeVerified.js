
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
        gotten: state.verified.gotten
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
      gotIt: (e) =>{
          dispatch(actions.showExits());
      },
    }
};

const CodeVerifiedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeVerified);

export default i18n(CodeVerifiedContainer);
