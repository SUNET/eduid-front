
import { connect } from 'react-redux';
import AccountLinking from 'components/AccountLinking';
import * as actions from "actions/AccountLinking";
import i18n from 'i18n-messages';



const mapStateToProps = (state, props) => {
  const pdata_fetching = state.personal_data ?
                         state.personal_data.is_fetching :
                         false;
  return {
     orcid: state.account_linking.orcid,
     is_configured: state.config.is_configured,
     is_fetching: state.account_linking.is_fetching || pdata_fetching,
     message: state.account_linking.message
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      handleOrcidDelete: function () {
          dispatch(actions.startOrcidRemove());
      },
      handleOrcidConnect: function () {
          dispatch(actions.startOrcidConnect());
      }
  }
};

const AccountLinkingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountLinking);

export default i18n(AccountLinkingContainer);
