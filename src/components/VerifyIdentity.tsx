import React, { Component, Fragment } from "react";
import i18n from "../login/translation/InjectIntl_HOC_factory";
import AddNin from "containers/AddNin";
import vettingRegistry from "vetting-registry";

import "../login/styles/index.scss";
import { NinInfo } from "reducers/Nins";

interface VerifyIdentityProps {
  translate(msg: string): string;
  nins: NinInfo[]; // all the user's nins
  verifiedNin: NinInfo[]; // all _verified_ nins
  verifiedSwePhone: boolean; // true if the user has a verified Swedish phone
  is_configured: boolean; // state.config.is_configured - app is configured I guess?
  verifiedNinStatus: boolean; // true if at least one nin in 'nins' is verified
  letter_verification: boolean; // state.letter_proofing.confirmingLetter
  proofing_methods: string[]; // proofing_methods from jsconfig (['letter', 'lookup_mobile', 'oidc', 'eidas']))
  message: string; // state.nins.message
}

class VerifyIdentity extends Component<VerifyIdentityProps> {
  render() {
    // page text depend on nin status (verified or not)
    let pageHeading = "";
    let pageText = "";
    let vettingButtons;
    const buttonHelpTextArray = [
      this.props.translate("letter.initialize_proofing_help_text"),
      this.props.translate("lmp.initialize_proofing_help_text"),
      this.props.translate("eidas.initialize_proofing_help_text"),
    ];
    const recoverIdentityTip = this.props.translate("verify-identity.verified_pw_reset_extra_security");

    // nin is not verified (add nin)
    const AddNumber = (props: VerifyIdentityProps) => {
      pageHeading = props.translate("verify-identity.unverified_main_title");
      pageText = props.translate("verify-identity.unverified_page-description");
      return (
        <div key="0" className="intro">
          <h4>{pageHeading}</h4>
          <p>{pageText}</p>
          <h3>{props.translate("verify-identity.add-nin_heading")}</h3>
        </div>
      );
    };

    const NumberAdded = (props: VerifyIdentityProps) => {
      // nin is verified (nin added)
      pageHeading = props.translate("verify-identity.verified_main_title");
      pageText = props.translate("verify-identity.verified_page-description");
      return (
        <div key="0" className="intro">
          <h4>{pageHeading}</h4>
          <p>{pageText}</p>
        </div>
      );
    };

    // top half of page: add nin/nin added
    const VerifyIdentity_Step1 = () => {
      if (this.props.verifiedNinStatus) {
        return <NumberAdded {...this.props} />;
      } else {
        return <AddNumber {...this.props} />;
      }
    };

    // this is where the buttons are generated
    // this needs to be outside of <VerifyIdentity_Step2> for the second modal to render
    if (this.props.is_configured && !this.props.verifiedNinStatus) {
      //this is an object listing all the vetting components in another file (src/vetting-registry.js)
      // BUG: used to be 'vettingRegistry(!this.props.valid_nin);' but there is no such prop.
      //      I guess the intent was to disable the buttons when the user is verified already?
      const vettingOptionsObject = vettingRegistry(!undefined) as { [key: string]: JSX.Element };
      // extract the keys from the vettingOptionsObject
      const vettingOptionsKeys = Object.keys(vettingOptionsObject);
      const addedNin = this.props.nins[0];
      vettingButtons = [
        <div key="1" id="nins-btn-grid">
          {vettingOptionsKeys.map((key, index) => {
            const helpText = buttonHelpTextArray[index];
            return (
              <div key={index}>
                {vettingOptionsObject[key]}
                {/* vettingRegistry object letter(index 0) and lookup_mobile(index 1) needs nin,
                      if index is less then 2 and nin is not added,
                      else index is 1 and mobile number is not verified Swedish number class name will be disabled*/}
                <p
                  key={index}
                  className={
                    "proofing-btn-help" +
                    ((index < 2 && !addedNin) || (index === 1 && !this.props.verifiedSwePhone) ? " disabled" : "")
                  }
                >
                  {helpText}
                </p>
              </div>
            );
          })}
        </div>,
      ];
    }

    // bottom half of page: vetting on added nin
    const VerifyIdentity_Step2 = () => {
      if (this.props.is_configured && !this.props.verifiedNinStatus) {
        return (
          <div key="1" className="intro">
            <h3>{this.props.translate("verify-identity.connect-nin_heading")}</h3>
            <p>{this.props.translate("verify-identity.connect-nin_description")}</p>
          </div>
        );
      } else {
        return <div />;
      }
    };

    return (
      <Fragment>
        <VerifyIdentity_Step1 />
        <AddNin {...this.props} />
        {this.props.verifiedNinStatus && <p className="help-text">{recoverIdentityTip}</p>}
        <VerifyIdentity_Step2 />
        {vettingButtons}
      </Fragment>
    );
  }
}

export default i18n(VerifyIdentity);
