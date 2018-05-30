
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import EmailInUse from 'components/EmailInUse';

const mapStateToProps = (state, props) => {
    return {
        reset_url: state.main.dashboard_url + 'reset-password',
    }
};

const EmailInUseContainer = connect(
  mapStateToProps
)(EmailInUse);

export default i18n(EmailInUseContainer);
