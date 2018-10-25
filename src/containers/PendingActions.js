
import { connect } from 'react-redux';
import PendingActions from 'components/PendingActions';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
      dashboard_url: state.config.DASHBOARD_URL,
      pending: state.profile.pending,
      pending_confirm: state.profile.pending_confirm
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleGoToPending: function (missing) {
      return function (e) {
          e.preventDefault();
          this.props.history.push(this.props.dashboard_url + missing);
      }
    },
  }
};

const PendingActionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingActions);

export default i18n(PendingActionsContainer);
