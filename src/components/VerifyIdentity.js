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

    if (this.props.nins.length && !this.props.verifiedNinStatus) {
      connectNin = [
        <div key="0" className="intro">
          <h3 key="0">
            2. Verify your id number
            {/* {this.props.translate("verify-identity.connect_nin_title")} */}
          </h3>
          <p>
            Choose a method to verify that you have access to the added id
            number. If you are unable to use a method you need to try another.
          </p>
        </div>,
        <div key="1" id="nins-btn-grid">
          {vettingButtons}
        </div>,
      ];
    }
    if (this.props.verifiedNinStatus) {
      headerText = this.props.translate("verify-identity.verified_main_title");
    } else {
      headerText = this.props.translate(
        "verify-identity.unverified_main_title"
      );
    }

    return (
      <Fragment>
        <div key="0" className="intro">
          <h4>{headerText}</h4>
          <p>
            To be able to use eduID you have to prove your identity. Add your
            national id number and verify it in real life.
          </p>
          <h3>1. Add your id number</h3>
          <AddNin {...this.props} />
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
