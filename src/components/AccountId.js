import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import "style/Security.scss";

class AccountId extends Component {
  render() {
    return (
      <div>
        <div id="change-password-container">
          <div className="intro">
            <h4>{this.props.l10n("accountId.main_title")} </h4>
            <p>{this.props.l10n("accountId.long_description")}</p>
          </div>
          <div key="1" className="profile-card">
            {/* <label>
              {this.props.l10n("accountId.accountId_display_title")}
            </label> */}
            <div id="nin-number-container">
              <p id="nin-number" className="verified">
                {this.props.eppn}
              </p>
            </div>
            <p className="orcid-btn-help">
              {this.props.l10n("accountId.short_description")}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

// Security.propTypes = {
//   credentials: PropTypes.array,
//   creation_date: PropTypes.string,
//   last_used: PropTypes.string,
//   langs: PropTypes.array,
//   confirming_change: PropTypes.bool,
//   deleted: PropTypes.bool,
//   handleStartConfirmationPassword: PropTypes.func,
//   handleStopConfirmationPassword: PropTypes.func,
//   handleConfirmationPassword: PropTypes.func,
//   confirming_deletion: PropTypes.bool,
//   handleStartConfirmationDeletion: PropTypes.func,
//   handleStopConfirmationDeletion: PropTypes.func,
//   handleConfirmationDeletion: PropTypes.func,
//   handleStartWebauthnRegistration: PropTypes.func,
//   handleCloseWebauthnModal: PropTypes.func
// };

//  export default PasswordChange;

const mapStateToProps = (state, props) => {
  return {
    eppn: state.personal_data.data.eppn
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const AccountIdContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountId);

export default i18n(AccountIdContainer);
