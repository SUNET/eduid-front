
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import AccountCreated from 'components/AccountCreated';

const mapStateToProps = (state, props) => {
    return {
        email: state.email.email,
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
    }
};

const AccountCreatedContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountCreated);

export default i18n(AccountCreatedContainer);

