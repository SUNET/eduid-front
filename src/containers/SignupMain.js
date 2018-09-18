
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import SignupMain from 'components/SignupMain';
import * as actions from "actions/SignupMain";

const mapStateToProps = (state, props) => {
    return {
        resize_timeout: state.main.resize_timeout,
        is_fetching: state.main.is_fetching,
        code: state.main.code,
        email: state.email.email,
        captcha: state.main.captcha
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        handleWindowSizeChange (e) {
            if (this.props.resize_timeout !== 0) {
                window.clearTimeout(this.props.resize_timeout);
            }
            const resize_timeout = window.setTimeout(
                function () {
                    dispatch(actions.resizeWindow());
                    dispatch(actions.resizeTimeout(0));
                }, 1000);
            dispatch(actions.resizeTimeout(resize_timeout));
        }
    }
};

const SignupMainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupMain);

export default i18n(SignupMainContainer);
