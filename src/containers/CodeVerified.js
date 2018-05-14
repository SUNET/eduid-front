
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import CodeVerified from 'components/CodeVerified';

const mapStateToProps = (state, props) => {
    return {
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
    }
};

const CodeVerifiedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeVerified);

export default i18n(CodeVerifiedContainer);


