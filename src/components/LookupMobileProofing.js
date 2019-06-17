import React, { Component } from "react";
import PropTypes from "prop-types";
import FormText from "reactstrap/lib/FormText";

import EduIDButton from "components/EduIDButton";
import ConfirmModal from "components/ConfirmModal";
import GenericConfirmModal from "components/GenericConfirmModal";
import "style/LookupMobileProofing.scss";

class LookupMobileProofing extends Component {
  render() {
    let modalPrompt = "";
    console.log(
      "these are the props in LookupMobileProofing:",
      this.props.phoneNumbers
    );
    if (this.props.phoneNumbers.length) {
      console.log("there are numbers!!!");
      modalPrompt = [
        <GenericConfirmModal
          modalId="mobileGenericConfirmDialog"
          title={this.props.l10n("lmp.confirm_title")}
          mainText={this.props.l10n("lmp.confirm_info")}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleLookupMobile}
        />
      ];
    } else {
      console.log("there are NO numbers!!! GO ADD NUMBERssszzz!!!");
      modalPrompt = [
        <GenericConfirmModal
          modalId="mobileGenericConfirmDialog"
          title={this.props.l10n("lmp.add_number_title")}
          mainText={this.props.l10n("lmp.add_number_info")}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleCloseModal}
        />
      ];
    }

    return (
      <div>
        <form
          id="lookup-mobile-proofing-form"
          className="form-horizontal"
          role="form"
        >
          <fieldset id="lookup-mobile-proofing">
            <EduIDButton
              className="proofing-button"
              disabled={this.props.disabled}
              // onClick={this.props.logoutparams}
              onClick={this.props.handleShowModal}
              // onClick={this.props.handleLookupMobile}
              block
            >
              {this.props.l10n("lmp.confirm-lookup-mobile")}
            </EduIDButton>
            <FormText className="proofing-btn-help" color="muted">
              {this.props.l10n("lmp.initialize_proofing_help_text")}
            </FormText>
          </fieldset>
        </form>
        {modalPrompt}
        {/* <ConfirmModal
          modalId="letterConfirmDialog"
          id="letterConfirmDialogControl"
          title={this.props.l10n("letter.verify_title")}
          resendLabel={this.props.l10n("cm.enter_code")}
          placeholder={this.props.l10n("letter.placeholder")}
          showModal={this.props.verifyingLetter}
          // closeModal={this.props.handleStopVerificationLetter}
          // handleConfirm={this.props.sendConfirmationCode}
          // with_resend_link={false}
        /> */}
      </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  disabled: PropTypes.bool,
  handleLookupMobile: PropTypes.func
};

export default LookupMobileProofing;
