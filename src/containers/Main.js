
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import Main from 'components/Main';
import * as actions from "actions/Main";

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

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default i18n(MainContainer);
