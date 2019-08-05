import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import AddNin from "containers/AddNin";
import NotificationsContainer from "containers/Notifications";
import vettingRegistry from "vetting-registry";

import "style/Nins.scss";

class VerifyIdentityProcess extends Component {
  render() {
    let vettingButtons = "",
      connectNin = "",
      headerText = "";
    let buttonHelpTextArray = [
      this.props.l10n("letter.initialize_proofing_help_text"),
      this.props.l10n("lmp.initialize_proofing_help_text"),
      this.props.l10n("eidas.initialize_proofing_help_text")
    ];
    if (this.props.is_configured) {
      const vettingBtns = vettingRegistry(!this.props.valid_nin);
      const verifyOptions = this.props.proofing_methods.filter(
        option => option !== "oidc"
      );
      vettingButtons = verifyOptions.map((key, index) => {
        let helpText = buttonHelpTextArray[index];
        return (
          <div key={index}>
            {vettingBtns[key]}
            <p key={index} className="proofing-btn-help">
              {helpText}
            </p>
          </div>
        );
      });
    }

    if (this.props.nins.length && !this.props.verifiedNinStatus) {
      connectNin = [
        <div key="1" id="connect-nin-number">
          <label key="0">
            {this.props.l10n("verify-identity.connect_nin_title")}
          </label>
          {/* <p className="profile-data">Request a confirmation code to</p>*/}
          <div key="1" id="nins-btn-group">
            {vettingButtons}
          </div>
        </div>
      ];
    }
    if (this.props.verifiedNinStatus) {
      headerText = this.props.l10n("verify-identity.verified_main_title");
    } else {
      headerText = this.props.l10n("verify-identity.unverified_main_title");
    }

    return (
      <div key="0" id="verify-identity-container">
        <h3 key="0" className="verify-identity-header">
          {headerText}
        </h3>
        <AddNin {...this.props} />
        {connectNin}
      </div>
    );
  }
}

// VerifyIdentityProcess;.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

// export default VerifyIdentityProcess;

const mapStateToProps = (state, props) => {
  return {
    is_configured: state.config.is_configured,
    letter_verification: state.letter_proofing.confirmingLetter,
    proofing_methods: state.config.PROOFING_METHODS,
    message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const VerifyIdentityProcessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyIdentityProcess);

export default i18n(VerifyIdentityProcessContainer);