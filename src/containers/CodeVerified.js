
import { connect } from 'react-redux';

import * as actions from "actions/CodeVerified";
import i18n from 'i18n-messages';
import CodeVerified from 'components/CodeVerified';


const mapStateToProps = (state, props) => {
    const url = '';
    return {
        dashboard_url: state.main.dashboard_url,
        password: state.verified.password,
        email: state.verified.email,
        status: state.verified.status,
    }
};

const CodeVerifiedContainer = connect(
  mapStateToProps
)(CodeVerified);

export default i18n(CodeVerifiedContainer);
