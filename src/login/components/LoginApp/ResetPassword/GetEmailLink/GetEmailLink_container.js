import { connect } from "react-redux";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";
import { withRouter } from "react-router-dom";

import GetEmailLink from "./GetEmailLink";
import * as actions from "./GetEmailLink_actions";

const mapStateToProps = (state) => {
  return {
    email: state.getEmailLink.email,
    enableReinitialize: true
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleEmailInput: e => {
      console.log("you're in handle EmailInput");
      e.preventDefault();
      const addedEmail = e.target.closest(".form").children[0].children[1]
        .value;
      if (addedEmail) {
        //login-rootSaga.js: This action will trigger a post of the email to to backend (postEmail() in GetEmailLink_sagas.js)
        dispatch(actions.addEmail(addedEmail));
      }
      props.history.push("/reset/reset-password/email-link-sent");
    }
  };
};

const GetEmailLinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GetEmailLink);

// export default InjectIntl(GetEmailLinkContainer);
export default InjectIntl(withRouter(GetEmailLinkContainer));
