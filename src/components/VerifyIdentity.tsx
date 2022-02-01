import React, { Component, Fragment } from "react";
import AddNin from "containers/AddNin";

import "../login/styles/index.scss";
import { NinInfo } from "reducers/Nins";
import { translate } from "login/translation";
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import LetterProofingContainer from "login/components/LetterProofing/LetterProofing";
import LookupMobileProofingContainer from "login/components/LookupMobileProofing/LookupMobileProofingContainer";
import EidasContainer from "containers/Eidas";

interface VerifyIdentityProps {
  nins: NinInfo[]; // all the user's nins
  verifiedNin: NinInfo[]; // all _verified_ nins
  hasVerifiedSwePhone: boolean; // true if the user has a verified Swedish phone
  hasVerifiedNin: boolean; // true if at least one nin in 'nins' is verified
  is_configured: boolean; // state.config.is_configured - app is configured I guess?
  letter_verification: boolean; // state.letter_proofing.confirmingLetter
  // TODO: proofing_methods seems unused? Used in some sub-component?
  proofing_methods: string[]; // proofing_methods from jsconfig (['letter', 'lookup_mobile', 'oidc', 'eidas']))
  message: string; // state.nins.message
}

class VerifyIdentity extends Component<VerifyIdentityProps> {
  render() {
    // page text depend on nin status (verified or not)
    let pageHeading, pageText, vettingButtons;
    const recoverIdentityTip = translate("verify-identity.verified_pw_reset_extra_security");

    // nin is not verified (add nin)
    const AddNumber = () => {
      pageHeading = translate("verify-identity.unverified_main_title");
      pageText = translate("verify-identity.unverified_page-description");
      return (
        <div key="0" className="intro">
          <h4>{pageHeading}</h4>
          <p>{pageText}</p>
          <h3>{translate("verify-identity.add-nin_heading")}</h3>
        </div>
      );
    };

    const NumberAdded = () => {
      // nin is verified (nin added)
      pageHeading = translate("verify-identity.verified_main_title");
      pageText = translate("verify-identity.verified_page-description");
      return (
        <div key="0" className="intro">
          <h4>{pageHeading}</h4>
          <p>{pageText}</p>
        </div>
      );
    };

    // top half of page: add nin/nin added
    const VerifyIdentity_Step1 = () => {
      if (this.props.hasVerifiedNin) {
        return <NumberAdded />;
      } else {
        return <AddNumber />;
      }
    };

    // this is where the buttons are generated
    // this needs to be outside of <VerifyIdentity_Step2> for the second modal to render
    if (this.props.is_configured && !this.props.hasVerifiedNin) {
      // BUG: used to be 'vettingRegistry(!this.props.valid_nin);' but there is no such prop.
      //      I guess the intent was to disable the buttons when the user is verified already?
      const disabled = !undefined;

      const addedNin = this.props.nins[0];

      const buttonHelpText = (msg: string, disabled_if?: boolean) => {
        return <p className={"proofing-btn-help" + (disabled_if === true ? " disabled" : "")}>{translate(msg)}</p>;
      };

      // proofing via letter requires the user to have added a NIN first
      const letterProofingDisabled = !addedNin;
      // proofing via mobile requires the user to have added a NIN first, and have a verified Swedish mobile phone
      const lookupMobileDisabled = !addedNin || !this.props.hasVerifiedSwePhone;
      // TODO: Maybe the help texts ought to move into the containers? Isn't that what containers are for - to group components?

      vettingButtons = (
        <div id="nins-btn-grid">
          <div>
            <LetterProofingContainer disabled={letterProofingDisabled} />
            {buttonHelpText("letter.initialize_proofing_help_text", letterProofingDisabled)}
          </div>
          <div>
            <LookupMobileProofingContainer disabled={lookupMobileDisabled} {...this.props} />
            {buttonHelpText("lmp.initialize_proofing_help_text", lookupMobileDisabled)}
          </div>
          <div>
            <EidasContainer disabled={disabled} />
            {buttonHelpText("eidas.initialize_proofing_help_text")}
          </div>
          <div>
            <OpenidConnectContainer disabled={disabled} />
          </div>
          <div>
            <OpenidConnectFrejaContainer disabled={disabled} />
          </div>
        </div>
      );
    }

    // bottom half of page: vetting on added nin
    const VerifyIdentity_Step2 = () => {
      if (this.props.is_configured && !this.props.hasVerifiedNin) {
        return (
          <div key="1" className="intro">
            <h3>{translate("verify-identity.connect-nin_heading")}</h3>
            <p>{translate("verify-identity.connect-nin_description")}</p>
          </div>
        );
      } else {
        return <div />;
      }
    };

    return (
      <Fragment>
        <VerifyIdentity_Step1 />
        <AddNin />
        {this.props.hasVerifiedNin && <p className="help-text">{recoverIdentityTip}</p>}
        <VerifyIdentity_Step2 />
        {vettingButtons}
      </Fragment>
    );
  }
}

export default VerifyIdentity;
