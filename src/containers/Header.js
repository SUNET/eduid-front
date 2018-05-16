
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import Header from 'components/Header';

const mapStateToProps = (state, props) => {
    return {
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
    }
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default i18n(HeaderContainer);
