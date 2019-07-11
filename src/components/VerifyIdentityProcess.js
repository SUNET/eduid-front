import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import AddNin from "./AddNin";
import NotificationsContainer from "containers/Notifications";
import vettingRegistry from "vetting-registry";

import "style/Nins.scss";

class VerifyIdentityProcess extends Component {
  render() {
    let vettingButtons = "",
      connectNin = "",
      headerText = "";
    let buttonTextArray = [
      this.props.l10n("verify-identity.vetting_post_tagline"),
      this.props.l10n("verify-identity.vetting_phone_tagline"),
      this.props.l10n("verify-identity.vetting_freja_tagline")
    ];
    if (this.props.is_configured) {
      const vettingBtns = vettingRegistry(!this.props.valid_nin);
      const verifyOptions = this.props.proofing_methods.filter(
        option => option !== "oidc"
      );
      vettingButtons = verifyOptions.map((key, index) => {
        let text = buttonTextArray[index];
        return <div key={index}>{vettingBtns[key]}</div>;
      });
    }

    if (this.props.nins.length && !this.props.verifiedNinStatus) {
      connectNin = [
        <div key="1" id="connect-nin-number">
          <label>{this.props.l10n("verify-identity.connect_nin_title")}</label>
          {/* <p className="profile-data">Request a confirmation code to</p>*/}
          <div id="nins-btn-group">
            {vettingButtons}
            <p className="proofing-btn-help">
              {this.props.l10n("letter.initialize_proofing_help_text")}
            </p>{" "}
            <p className="proofing-btn-help">
              {this.props.l10n("lmp.initialize_proofing_help_text")}
            </p>
            <p className="proofing-btn-help">
              {this.props.l10n("eidas.initialize_proofing_help_text")}
            </p>
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
      <div id="verify-identity-container">
        <h3 className="verify-identity-header">{headerText}</h3>
        <AddNin {...this.props} />
        {connectNin}
      </div>
    );
  }
}

// Nins.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

export default VerifyIdentityProcess;
