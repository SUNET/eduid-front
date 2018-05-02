
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import Main from 'components/Main';

const mapStateToProps = (state, props) => {
    return {
        code: state.main.code,
        email: state.main.email,
        captcha: state.main.captcha
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
    }
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default i18n(MainContainer);
