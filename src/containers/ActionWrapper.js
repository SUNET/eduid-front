
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import ActionWrapper from 'components/ActionWrapper';
import * as actions from "actions/ActionWrapper";

const mapStateToProps = (state, props) => {
    return {
        redirect: state.main.redirect,
        resize_timeout: state.main.resize_timeout,
        is_fetching: state.main.is_fetching
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

const ActionWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionWrapper);

export default i18n(ActionWrapperContainer);

