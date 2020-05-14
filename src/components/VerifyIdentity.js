import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import { withRouter } from "react-router-dom";
import AddNin from "containers/AddNin";
import vettingRegistry from "vetting-registry";

import "../login/styles/index.scss";

class VerifyIdentity extends Component {
  render() {
    let vettingButtons = "";
    let connectNin = "";
    let headerText = "";
    let recoverIdentityTip = "";
    let ninExplanation = this.props.translate(
      "verify-identity.unverified_page-description"
    );
    let numberedHeading = this.props.translate(
      "verify-identity.add-nin_heading"
    );
    let buttonHelpTextArray = [
      this.props.translate("letter.initialize_proofing_help_text"),
      this.props.translate("lmp.initialize_proofing_help_text"),
      this.props.translate("eidas.initialize_proofing_help_text"),
    ];
    if (this.props.is_configured) {
      const vettingBtns = vettingRegistry(!this.props.valid_nin);
      const verifyOptions = this.props.proofing_methods.filter(
        (option) => option !== "oidc"
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

    if (!this.props.verifiedNinStatus) {
      headerText = this.props.translate(
        "verify-identity.unverified_main_title"
      );
      connectNin = [
        <div key="1" className="intro">
          <h3 key="0">
            {this.props.translate("verify-identity.connect-nin_heading")}
          </h3>
          <p>
            {this.props.translate("verify-identity.connect-nin_description")}
          </p>
          <div key="1" id="nins-btn-grid">
            {vettingButtons}
          </div>
        </div>,
      ];
    } else if (this.props.verifiedNinStatus) {
      headerText = this.props.translate("verify-identity.verified_main_title");
      connectNin = "";
      numberedHeading = "";
      ninExplanation = this.props.translate(
        "verify-identity.verified_page-description"
      );
      recoverIdentityTip = this.props.translate(
        "verify-identity.verified_pw_reset_extra_security"
      );
    }

    return (
      <Fragment>
        <div key="0" className="intro">
          <h4>{headerText}</h4>
          <p>{ninExplanation}</p>
          <h3>{numberedHeading}</h3>
          <AddNin {...this.props} />
          <p className="help-text">{recoverIdentityTip}</p>
        </div>
        {connectNin}
      </Fragment>
    );
  }
}

VerifyIdentity.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array,
};

export default i18n(withRouter(VerifyIdentity));
