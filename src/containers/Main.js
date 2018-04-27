
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import Main from 'components/Main';

const mapStateToProps = (state, props) => {
    return {
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
