
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import EmailInUse from 'components/EmailInUse';

const mapStateToProps = (state, props) => {
    return {
        reset_url: state.config.reset_passwd_url,
    }
};

const EmailInUseContainer = connect(
  mapStateToProps
)(EmailInUse);

export default i18n(EmailInUseContainer);
